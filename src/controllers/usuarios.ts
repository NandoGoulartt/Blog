import connectToDatabase from "@/model/db";
import Usuario from "@/model/schemas/usuarios";
import { NextApiRequest, NextApiResponse } from "next";

export const cadastrarUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome, email, senha } = req.body;

  try {
    await connectToDatabase();

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ message: "O email já está em uso." });
    }

    const novoUsuario = await Usuario.create({ nome, email, senha });


    return res.status(200).json(novoUsuario);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao armazenar o usuário:", error.message);
    } else {
      console.error("Erro desconhecido ao armazenar o usuário:", error);
    }

    return res.status(500).json({ message: "Erro ao cadastrar o usuário." });
  }
};

export const atualizarUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, novaSenha, novoNome, novoEmail } = req.body;

  try {
    await connectToDatabase();
    const usuario = await Usuario.findOne({ email });

    usuario.senha = novaSenha || usuario.senha;
    usuario.nome = novoNome || usuario.nome;
    usuario.email = novoEmail || usuario.email;

    await usuario.save();
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno!" });
  }
};

export const loginUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, senha } = req.body;
  try {
    await connectToDatabase();
    const usuario = await Usuario.findOne({ email });

    if (!usuario || senha !== usuario.senha) {
      return res.status(404).json({ message: "Credenciais inválidas" });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno!" });
  }
};
