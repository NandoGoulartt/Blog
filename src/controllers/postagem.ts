import connectToDatabase from "@/model/db";
import Postagem from "@/model/schemas/postagem";
import Usuario from "@/model/schemas/usuarios";

export const criarPostagem = async ({ title, thumbnail, content, usuario }: { title: string; thumbnail: string | ArrayBuffer | null; content: string; usuario: string }) => {
  try {
    await connectToDatabase();
    const novaPostagem = await Postagem.create({ title, thumbnail, content, usuario });
    console.log("Postagem criada:", novaPostagem);
    return novaPostagem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao criar a postagem:", error.message);
    } else {
      console.error("Erro desconhecido ao criar a postagem:", error);
    }
    return null;
  }
};

export const editarPostagem = async ({ id, title, thumbnail, content, usuario }: { id: string | string[]; title: string; thumbnail: string | ArrayBuffer | null; content: string; usuario: string }) => {
  try {
    await connectToDatabase();
    const postagemAtualizada = await Postagem.findByIdAndUpdate(id, { title, thumbnail, content, usuario }, { new: true });
    console.log("Postagem atualizada:", postagemAtualizada);
    return postagemAtualizada;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao atualizar a postagem:", error.message);
    } else {
      console.error("Erro desconhecido ao atualizar a postagem:", error);
    }
    return null;
  }
};
export const buscarPostagem = async () => {
  try {
    await connectToDatabase();

    const postagens = await Postagem.find({})
      .sort({ updatedAt: -1 })
      .lean();

    const usuariosIds = [...new Set(postagens.map((postagem) => postagem.usuario))];

    const usuarios = await Usuario.find({ _id: { $in: usuariosIds } });

    const postagensComUsuario = postagens.map((postagem) => {
      const usuarioAssociado = usuarios.find((usuario) => usuario._id.equals(postagem.usuario));
      return {
        ...postagem,
        usuario: usuarioAssociado,
      };
    });

    return postagensComUsuario;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar as postagens com detalhes do usuário:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar as postagens com detalhes do usuário:", error);
    }
    return [];
  }
};


export const buscarPostagemPorId = async (postId: string) => {
  try {
    await connectToDatabase();
    
    const postagens = await Postagem.find({ _id: postId }).lean();

    if (!postagens) {
      return null; 
    }
    
    const usuariosIds = [...new Set(postagens.map(postagem => postagem.usuario))];

    const usuarios = await Usuario.find({ _id: { $in: usuariosIds } });

    const postagensComUsuario = postagens.map(postagem => {
      const usuarioAssociado = usuarios.find(usuario => usuario._id.equals(postagem.usuario));
      return {
        ...postagem,
        usuario: usuarioAssociado 
      };
    });

    return postagensComUsuario;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar a postagem com detalhes do usuário:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar a postagem com detalhes do usuário:", error);
    }
    return null;
  }
};

export const buscarPostagensPorUsuario = async (userId: string) => {
  try {
    await connectToDatabase();
    
    const postagens = await Postagem.find({ usuario: userId })
      .sort({ updatedAt: -1 }) 
      .lean();

    if (!postagens || postagens.length === 0) {
      return null; 
    }
    
    const postagensComUsuario = await Promise.all(postagens.map(async (postagem) => {
      const usuario = await Usuario.findOne({ _id: postagem.usuario });

      return {
        ...postagem,
        usuario: usuario 
      };
    }));

    return postagensComUsuario;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar as postagens com detalhes do usuário:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar as postagens com detalhes do usuário:", error);
    }
    return null;
  }
};
