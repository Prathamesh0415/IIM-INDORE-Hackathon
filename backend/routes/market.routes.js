import express from 'express'
import { addProduce, deleteProduct } from '../controllers/produce.controller.js'

const router = express.Router()

router.post('/createitem', addProduce)
router.delete('/deleteproduce/:id', deleteProduct)

export default router