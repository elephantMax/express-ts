import { Router } from 'express'
import AsyncHandler from 'express-async-handler'

import AuthController from '../controllers/AuthController'
import { SignInSchema, SignUpSchema } from '../validators/user-validator'
import { checkSchema } from 'express-validator'

const router = Router()

router.post(
  '/signup',
  checkSchema(SignUpSchema),
  AsyncHandler(AuthController.signup)
)
router.post(
  '/signin',
  checkSchema(SignInSchema),
  AsyncHandler(AuthController.signin)
)
router.post('/logout', AsyncHandler(AuthController.logout))
router.get('/refresh', AsyncHandler(AuthController.refresh))

export default router
