import { Router } from 'express';
import { PostController } from '../controller/postController';
import { PostRepository } from '../repository/postRepository';
import { PostService } from '../services/postService';

const router = Router();

const repo = new PostRepository();
const service = new PostService(repo);
const controller = new PostController(service);

router.post("/", controller.create);

router.get("/", controller.getAll);

export default router;