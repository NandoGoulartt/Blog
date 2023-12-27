import { buscarPostagemPorId, buscarPostagensPorUsuario } from "@/controllers/postagem";
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
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
