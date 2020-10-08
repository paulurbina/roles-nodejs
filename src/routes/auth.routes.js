import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { verifySignup } from '../middlewares'

router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolExisted], authController.signup)
router.post('/signin', authController.signin)

export default router

// investigar codigo de estados http
// joi validator
