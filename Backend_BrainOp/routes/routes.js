import express from 'express'
import { Post, SignUp } from '../controllers/main.js'

const router=express.Router();

router.post('/signup',SignUp);
router.post('/post/:page',Post);
export default router;