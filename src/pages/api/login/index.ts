import { loginUsuario } from "@/controllers/usuarios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const response = await loginUsuario(req, res);

    return response
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
