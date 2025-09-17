export type CreatePostInput = {
    title: string;
    content: string;
    tags: string[];
};

export type AlterarTitulo = {
    id: number;
    newTitle: string;
}


export type PostRecord = {
    title: string;
    content: string;
    tags: {name: string}[];
};

export type AdicionarTags = {
    id: number;
    tags: string[];
}

export interface IPostRepository {
    createPost(input: CreatePostInput): Promise<PostRecord>;
    consultarPost(): Promise<PostRecord[]>;
    alterarTitulo(input: AlterarTitulo): Promise<PostRecord>;
    adicionarTags(input: AdicionarTags): Promise<PostRecord>;
}
