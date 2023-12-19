import { cadastrarUsuario } from "@/controllers/usuarios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      await cadastrarUsuario(req);
      res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
