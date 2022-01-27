import { Router } from 'express'
import AsyncHandler from 'express-async-handler'
import { checkSchema } from 'express-validator'

import UserController from '../controllers/UserController'
import { authMiddleWare } from '../middleware/auth-middleware'
import { UpdateUserSchema, avatarValidator, verifyUser } from '../validators/user-validator'

const router = Router()

router.get('/', authMiddleWare, AsyncHandler(UserController.getAll))
router.put(
  '/:id',
  authMiddleWare,
  verifyUser,
  checkSchema(UpdateUserSchema),
  avatarValidator,
  AsyncHandler(UserController.updateUser)
)

export default router
