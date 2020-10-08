import { ROLES } from '../models/Role'
import User from '../models/User'

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).json({ message: 'The user already exists' })

    const email = await USer.findOne({ email: req.body.email })
    if (email) return res.status(400).json({ message: 'The email already exists' })
}

export const checkRolExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let index = 0; index < req.body.roles.length; index++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({ msg: 'Rol not exits' })
            }
        }
    }

    next()
}