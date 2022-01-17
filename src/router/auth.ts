import { Router } from 'express'
import AsyncHandler from 'express-async-handler'

import AuthController from '../controllers/AuthController'
import { body } from 'express-validator'

const router = Router()

router.post(
  '/signup',
  body('login').isLength({ min: 3, max: 32 }),
  body('password').isLength({ min: 3, max: 32 }),
  AsyncHandler(AuthController.signup)
)
router.post(
  '/signin',
  body('login').isLength({ min: 3, max: 32 }),
  body('password').isLength({ min: 3, max: 32 }),
  AsyncHandler(AuthController.signin)
)
router.post('/logout', AsyncHandler(AuthController.logout))
router.get('/refresh', AsyncHandler(AuthController.refresh))

export default router
