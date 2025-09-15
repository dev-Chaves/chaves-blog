export type CreatePostResponse = {
    id: number
    title: string, 
    content: string,
    tags?: string[],
}

export type PostListItem = {
    id: number;
    title: string;
    content: string;
    tags?: string[]
}

export type GetAllPost = {
    posts: PostListItem[];
    total?: number;
    page?: number;
    pageSize?: number;
}