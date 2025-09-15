import prisma from "../prisma/client";

type CreatePostInput = {
    title: string;
    content: string;
    tags: string[];
};

export class PostRepository {

    async createPost({title, content, tags}: CreatePostInput) {

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

}