import prisma from "../prisma/client";
import { AdicionarTags, AlterarTitulo, IPostRepository, PostRecord } from "./IPostRepository";

type CreatePostInput = {
    title: string;
    content: string;
    tags: string[];
};

export class PostRepository implements IPostRepository{

    async createPost({title, content, tags}: CreatePostInput): Promise<PostRecord> {

        const uniqueTags = Array.from( 
            new Set((tags || [])
            .map(t => t.trim()).filter(Boolean))
        );

        const post = await prisma.post.create({
            data: {
                title,
                content,
                tags: {
                    connectOrCreate: uniqueTags.map(name => ({
                        where: {name},
                        create: { name }
                    })),
                },
            },
            include:{tags: true}
        })

        return post;

    }

    async consultarPost(){
        return await prisma.post.findMany({
            select:{
                id: true,
                title: true,
                content: true,
                tags: {
                    select: {
                        name: true
                    }
                }
            }
        
        });
    }

    async alterarTitulo(input: AlterarTitulo): Promise<PostRecord> {
        return await prisma.post.update({
            where: {
                id: input.id
            },
            data: {
                title: input.newTitle
            },
            include: {
                tags: true 
            }
        });
    }
    
    async adicionarTags(input: AdicionarTags): Promise<PostRecord> {

        const uniqueTags = Array.from( 
            new Set((input.tags || [])
            .map(t => t.trim()).filter(Boolean))
        );

        return await prisma.post.update({
            where: {
                id: input.id
            },
            data: {
                tags:{
                    connectOrCreate: uniqueTags.map(name => ({
                        where: {name},
                        create: {name}
                    })),
                }
            },
            include: {
                tags: true
            }
        })

    }

}