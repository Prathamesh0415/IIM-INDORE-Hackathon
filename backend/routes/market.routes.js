import express from 'express'
import { addProduce } from '../controllers/produce.controller.js'

const router = express.Router()

router.post('/createitem', addProduce)

export default router