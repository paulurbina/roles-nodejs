import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({ msg: 'No token' })

        const decoded = jwt.verify(token, config.SECRET_JWT)
        req.userId = decoded.id

        const userFound = await User.findById(req.userId, { password: 0 })
        if (!userFound) return res.status(404).json({ msg: 'No user found' })

        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Unauthorized' })
    }
}


export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles }})

    for (let i=0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next()
            return
        }
    }

    return res.status(403).json({ msg: 'Required moderator rol' })
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles }})

    for (let i=0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next()
            return
        }
    }

    return res.status(403).json({ msg: 'Required moderator admin' })
}