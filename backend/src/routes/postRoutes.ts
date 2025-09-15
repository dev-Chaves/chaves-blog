import { Router } from 'express';
import { createPost, consultarPosts } from '../controller/postController';

const router = Router();

router.post("/", createPost);

router.get("/", consultarPosts);

export default router;