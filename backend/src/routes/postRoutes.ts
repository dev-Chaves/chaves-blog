import { Router } from 'express';
import { PostController } from '../controller/PostController';
import { PostRepository } from '../repository/PostRepository';
import { PostService } from '../services/PostService';

const router = Router();

const repo = new PostRepository();
const service = new PostService(repo);
const controller = new PostController(service);

router.post("/", controller.create);

router.get("/", controller.getAll);

router.post("/alterar-titulo", controller.alterarTitulo);

router.patch("/adicionar-tags/:id", controller.adicionarTags);

router.delete("/:id", controller.apagarPost);

router.put("/:id", controller.alterarConteudo);

router.put("/", controller.removerTags);

export default router;
