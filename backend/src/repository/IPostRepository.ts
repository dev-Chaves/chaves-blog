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
    id: number;
    title: string;
    content: string;
    tags: {name: string}[];
};

export type AdicionarTags = {
    id: number;
    tags: string[];
}

export type AlterarConteudo = {
    id: number;
    content: string;
}


export interface IPostRepository {
    createPost(input: CreatePostInput): Promise<PostRecord>;
    consultarPost(): Promise<PostRecord[]>;
    alterarTitulo(input: AlterarTitulo): Promise<PostRecord>;
    adicionarTags(input: AdicionarTags): Promise<PostRecord>;
    apagarPost(input: number): Promise<void>;
    editarConteudo(input: AlterarConteudo): Promise<PostRecord>;
}
