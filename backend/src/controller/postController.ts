import { Request, Response } from "express";
import { PostService } from "../services/PostService";

const service = new PostService();

export const createPost = async (req: Request, res: Response) => {
    try{
        const {title, content, tags} = req.body;

        const post = await service.create({title, content, tags});

        return res.status(201).json(post);
    }catch(err: any){
        console.log(err);
        return res.status(400).json({error: err.message ?? "Bad Request"})
    }
}