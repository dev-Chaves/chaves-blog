import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { CreatePostResponse } from "../dto/postsDTOs";

export class PostController {
  constructor(private service: PostService) { }

  create = async (req: Request, res: Response) => {

    try {
      const { title, content, tags } = req.body;

      const post = await this.service.create({ title, content, tags });

      const response: CreatePostResponse = {
        title: post.title,
        content: post.content,
        tags: post.tags?.map((t: { name: string }) => t.name)
      }

      return res.status(201).json(response);

    } catch (err: any) {

      console.log(err);

      return res.status(400).json({ error: err.message ?? "Bad Request" });

    }
  }

  getAll = async (req: Request, res: Response) => {

    try {
      const posts = await this.service.getPosts();

      return res.json(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Erro interno" });
    }

  }

  alterarTitulo = async (req: Request, res: Response) => {
      try{

        const data = req.body;

        const post = await this.service.alterarTitulo(data);

        return res.status(200).json(post);

      }catch(err){
          console.log(`Error ao alterar titulo: ${err}`);
          return res.status(400).json({message: err})
      }
  }

  adicionarTags = async (req: Request, res: Response) => {
    try{
      const {id} = req.params;

      const {tags} = req.body;

      console.log(`Id: ${id}`);

      const post = await this.service.adicionarTags(
        {
          id: parseInt(id),
          tags: tags
        }
      );

      return res.status(200).json(post);

    }catch(err){
      console.log(err);
      return res.status(400).json("Erro na requisição");
    }
  }

  apagarPost = async (req: Request, res: Response) => {

    try{

      const {id} = req.params;

      const apagarPost = this.service.apagarPost({id: parseInt(id)});
      
      return res.status(200).json(`Post número ${id} apagado com sucesos!`);

    }catch(err){
        console.log(`Erro: ${err}`);
        return res.status(400).json("Erro ao apagar post!");
    }
  }

  alterarConteudo = async (req: Request, res: Response) => {

    try {
      const {id} = req.params;
      const {content} = req.body;
      const editarConteudo = await this.service.alterarConteudo({id: parseInt(id), content });
      return res.status(200).json(editarConteudo);
    } catch (err) {
      console.log(`Error: ${err}`);
      return res.status(400).json("Erro na requisição!");
    }

  }

}

