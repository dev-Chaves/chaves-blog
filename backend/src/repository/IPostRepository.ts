export type CreatePostInput = {
    title: string;
    content: string;
    tags: string[];
};

export type PostRecord = {
    title: string;
    content: string;
    tags: {name: string}[];
};

export interface IPostRepository {
    createPost(input: CreatePostInput): Promise<PostRecord>;
    consultarPost(): Promise<PostRecord[]>;
}
