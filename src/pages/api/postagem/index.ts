import { criarPostagem } from "@/controllers/postagem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      await criarPostagem(req);
      res.status(200).json({ message: "Postagem criada com sucesso!" });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
