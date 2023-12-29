import { buscarPostagemPorId, buscarPostagensPorUsuario, editarPostagem } from "@/controllers/postagem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { id, userId } = req.query;

      if (id) {
        const postagem = await buscarPostagemPorId(id.toString());

        if (!postagem) {
          return res.status(404).json({ error: "Postagem não encontrada" });
        }

        return res.status(200).json(postagem);
      } else if (userId) {
        const postagensUsuario = await buscarPostagensPorUsuario(userId.toString());

        if (!postagensUsuario || postagensUsuario.length === 0) {
          return res.status(404).json({ error: "Nenhuma postagem encontrada para este usuário" });
        }

        return res.status(200).json(postagensUsuario);
      } else {
        return res.status(400).json({ error: "Parâmetros inválidos" });
      }
    }else if (req.method === "PUT") {
      const { id } = req.query;
      const { title, thumbnail, content, usuario } = req.body;

      if (!id || !title || !thumbnail || !content || !usuario) {
        return res.status(400).json({ error: "Parâmetros inválidos para atualização da postagem" });
      }

      const postagemAtualizada = await editarPostagem({ id, title, thumbnail, content, usuario });

      if (!postagemAtualizada) {
        return res.status(500).json({ error: "Erro ao atualizar a postagem" });
      }

      return res.status(200).json(postagemAtualizada);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
