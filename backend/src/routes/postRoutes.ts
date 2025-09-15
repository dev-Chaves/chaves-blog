import { Router } from 'express';
import { createPost } from '../controller/postController';

const router = Router();

router.post("/", createPost);

export default router;