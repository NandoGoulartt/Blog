import { loginUsuario } from "@/controllers/usuarios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, senha } = req.body;
    console.log("teste");
    const response = await loginUsuario(email, senha);

    if ("error" in response) {
      res.status(401).json({ error: response.error });
    } else {
      res.status(200).json({ message: response.message });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
