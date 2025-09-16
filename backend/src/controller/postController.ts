import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { CreatePostResponse, PostListItem } from "../dto/postsDTOs";

export class PostController{
    constructor(private service: PostService){}

    getAll = async (req: Request, res: Response) => {
    
        try{
            const {title, content, tags} = req.body;

            const post = await this.service.create({title, content, tags});

            const response: CreatePostResponse = {
                title: post.title,
                content: post.content,
                tags: post.tags?.map((t: {name: string}) => t.name)
        }

        return res.status(201).json(response);

        }catch(err: any){

            console.log(err);

            return res.status(400).json({error: err.message ?? "Bad Request"});

        }
    }
    create = async(req: Request, res: Response) => {

        try{
            const posts = await this.service.getPosts();

            return res.json(posts);
        }catch(err){
            console.log(err);
            return res.status(500).json({message: "Erro interno"});
        }

    }

}

