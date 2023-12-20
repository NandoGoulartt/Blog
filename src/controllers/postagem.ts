import connectToDatabase from "@/model/db";
import Postagem from "@/model/schemas/postagem";
import { NextApiRequest } from "next";

export const criarPostagem = async (req: NextApiRequest) => {
  const { title, thumbnail, content, usuario } = req.body;
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
