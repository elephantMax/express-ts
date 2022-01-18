import { Router } from 'express'
import AsyncHandler from 'express-async-handler'

import UserController from '../controllers/UserController'
import { authMiddleWare } from '../middleware/auth-middleware'

const router = Router()

router.get('/', authMiddleWare, AsyncHandler(UserController.getAll))
router.put('/:id', authMiddleWare, AsyncHandler(UserController.updateUser))

export default router
