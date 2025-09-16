export type CreatePostResponse = {
    title: string, 
    content: string,
    tags?: string[],
}

export type PostListItem = {
    title: string;
    content: string;
    tags?: string[]
}