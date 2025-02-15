import express from 'express'
import { createPost, deletePost, getAllPost, getPost } from '../controllers/forum.controller.js'

const router = express.Router()

router.post('/createpost', createPost)
router.delete('/deletepost/:id', deletePost)
router.get('/', getAllPost)
router.get('/:id', getPost)

export default router