import { Router } from 'express';
import { PostController } from '../controller/postController';
import { PostRepository } from '../repository/PostRepository';
import { PostService } from '../services/PostService';

const router = Router();

const repo = new PostRepository();
const service = new PostService(repo);
const controller = new PostController(service);

router.post("/", controller.create);

router.get("/", controller.getAll);

router.post("/alterar-titulo", controller.alterarTitulo);

router.patch(":id/adicionar-tags", controller.adicionarTags);


export default router;
