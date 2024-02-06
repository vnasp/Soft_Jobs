import express from 'express'
import { sessionUsers } from '../controllers/sessionsController.js'
import { validForm } from '../middlewares/validateLogin.js'

const router = express.Router()

router.post('/login', sessionUsers)

export default router