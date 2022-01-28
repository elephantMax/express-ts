import { Router } from 'express'
import AsyncHandler from 'express-async-handler'

import FileController from '../controllers/FileController'
import { authMiddleWare } from '../middleware/auth-middleware'
import { CreateSchema } from '../validators/file-validator'
import { checkSchema } from 'express-validator'

const router = Router()

router.get('/', authMiddleWare, AsyncHandler(FileController.getAll))
router.post(
  '/',
  authMiddleWare,
  checkSchema(CreateSchema),
  AsyncHandler(FileController.create)
)
router.delete('/:id', authMiddleWare, AsyncHandler(FileController.remove))
export default router
