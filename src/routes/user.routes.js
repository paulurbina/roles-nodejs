import { Router } from 'express'
const router = Router()

import * as userCtrl from '../controllers/user.controller'

import { verifySignup, authJwt } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolExisted], userCtrl.createUser)

export default router