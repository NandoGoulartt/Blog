import { buscarPostagem, criarPostagem } from "@/controllers/postagem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const postagens = await buscarPostagem();
      res.status(200).json(postagens);
    } else if (req.method === "POST") {
      await criarPostagem(req.body);
      res.status(200).json({ message: "Postagem criada com sucesso!" });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};