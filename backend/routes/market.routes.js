import express from 'express'
import { addProduce, deleteProduct, getAllProduce } from '../controllers/produce.controller.js'

const router = express.Router()

router.post('/createitem', addProduce)
router.delete('/deleteproduce/:id', deleteProduct)
router.get('/products', getAllProduce)

export default router