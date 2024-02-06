import express from 'express'
import {addUsers, getProfiles} from '../controllers/usersController.js'
import { isLogin } from '../middlewares/isLogin.js'
import { validForm } from '../middlewares/validateLogin.js'

const router = express.Router()

router.post('/usuarios', validForm, addUsers)
router.get('/usuarios', isLogin, getProfiles)

export default router