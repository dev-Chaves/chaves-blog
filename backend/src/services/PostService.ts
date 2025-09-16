import { PostListItem } from "../dto/postsDTOs";
import { IPostRepository } from "../repository/IPostRepository";

export class PostService {

    constructor(private repo: IPostRepository){}

    async create (data: {
        title: string; 
        content: string; 
        tags?: string[]
    }){
        if(!data.title?.trim()) throw new Error("Título obrigatório");        
        if(!data.content.trim()) throw new Error("Conteúdo obrigatório");        

        return this.repo.createPost({
            title: data.title.trim(),
            content: data.content.trim(),
            tags: data.tags ?? []
        });

    }

    async getPosts(){
        const posts = await this.repo.consultarPost();

        const response = posts.map((
            p: {
                title: string, 
                content: string, 
                tags?: {name: string}[]}) => ({
            title: p.title,
            content: p.content,
            tags: (p.tags ?? []).map((tag: {name: string}) => tag.name)
        }));

        return response;
    }

}

