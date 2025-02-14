import express from 'express'
import { createPost, deletePost } from '../controllers/forum.controller.js'

const router = express.Router()

router.post('/createpost', createPost)
router.delete('/deletepost/:id', deletePost)

export default router