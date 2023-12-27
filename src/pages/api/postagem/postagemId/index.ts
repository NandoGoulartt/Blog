import { buscarPostagemPorId } from "@/controllers/postagem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID da postagem não fornecido" });
      }

      const postagem = await buscarPostagemPorId(id.toString());

      if (!postagem) {
        return res.status(404).json({ error: "Postagem não encontrada" });
      }

      res.status(200).json(postagem);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
