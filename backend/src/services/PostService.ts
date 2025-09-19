import { IPostRepository } from "../repository/IPostRepository";

export class PostService {

  constructor(private repo: IPostRepository) { }

  async create(data: {
    title: string;
    content: string;
    tags?: string[]
  }) {
    if (!data.title?.trim()) throw new Error("Título obrigatório");
    if (!data.content.trim()) throw new Error("Conteúdo obrigatório");

    return this.repo.createPost({
      title: data.title.trim(),
      content: data.content.trim(),
      tags: data.tags ?? []
    });

  }

  async getPosts() {
    const posts = await this.repo.consultarPost();

    const response = posts.map((posts) => ({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      tags: (posts.tags ?? []).map(tag => ({
        id: tag.id,
        name: tag.name
      }))
    }))

    return response;
  }

  async alterarTitulo(data: {
    id: number,
    newTitle: string
  }) {
    if (data.id == null) { throw new Error("Erro no Id do post") }
    if (!data.newTitle?.trim()) { throw new Error("Conteúdo vázio no título") }

    const response = this.repo.alterarTitulo(data);

    return {
      title: (await response).title,
      content: (await response).content,
      tags: (await response).tags
    };
  }

  async adicionarTags(data: {
    id: number, tags: string[]
  }) {

    if (data.id == null) { throw new Error("Id inválido!") }
    if (!data.tags || data.tags.length == 0) { throw new Error("Nenhuma tag foi enviada") }

    const response = this.repo.adicionarTags(data);

    return {
      title: (await response).title,
      content: (await response).content,
      tags: (await response).tags,
    };

  }

  async apagarPost(data: { id: number }) {
    if (data.id == null || data.id <= 0) { throw new Error("Id inválido!") }

    const deletarPost = this.repo.apagarPost(data.id);

    console.log(`Post número ${data.id} apagado com sucesos!`);

  }

  async alterarConteudo(data: { id: number, content: string }) {
    if (!data.content.trim || data.id == null || data.id <= 0) { throw new Error("Erro no conteúdo enviado") }

    const newContent = await this.repo.editarConteudo(data);

    const response = {
      id: newContent.id,
      title: newContent.title,
      content: newContent.content,
      tags: newContent.tags
    };

    return response;
  }

  async removerTags(data: { idPost: number, idTags: number[] }) {

    const { idPost, idTags } = data;

    if (data.idTags.length === 0) throw new Error("Tags inválidas ou vazias");
    if (data.idPost <= 0) throw new Error("Post inválido, id precisa ser maior que 0");

    const altera = await this.repo.removerTags({ idPost, idTags })

  }

}

