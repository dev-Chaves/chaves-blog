import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { CreatePostResponse, PostListItem } from "../dto/postsDTOs";

const service = new PostService();

export const createPost = async (req: Request, res: Response) => {
    try{
        const {title, content, tags} = req.body;

        const post = await service.create({title, content, tags});

        const response: CreatePostResponse = {
            id: post.id,
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

export const consultarPosts = async(req: Request, res: Response) => {

    try{
        const posts = await service.getPosts();

        return res.json(posts);
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Erro interno"});
    }

}