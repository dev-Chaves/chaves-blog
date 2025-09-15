import { PostListItem } from "../dto/postsDTOs";
import { PostRepository } from "../repository/postRepository";

export class PostService {
    constructor(private repo = new PostRepository()){}

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

        const response = posts.map(p => ({
            id: p.id,
            title: p.title,
            content: p.content,
            tags: (p.tags ?? []).map((t: any) => t.name)
        }));

        return response;
    }

}

