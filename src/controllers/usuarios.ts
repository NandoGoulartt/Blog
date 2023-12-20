import connectToDatabase from "@/model/db";
import Usuario from "@/model/schemas/usuarios";
import { NextApiRequest } from "next";

export const cadastrarUsuario = async (req: NextApiRequest) => {
  const { nome, email, senha } = req.body;
  try {
    await connectToDatabase();
    const novoUsuario = await Usuario.create({ nome, email, senha });
    console.log("Usuário cadastrado:", novoUsuario);
    return novoUsuario;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao armazenar o usuário:", error.message);
    } else {
      console.error("Erro desconhecido ao armazenar o usuário:", error);
    }
    return null;
  }
};

export const loginUsuario = async (email: string, senha: string) => {
  try {
    console.log("skdnpaslfnp", email);

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return { error: "Credenciais inválidas" };
    }

    if (usuario.senha !== senha) {
      return { error: "Credenciais inválidas" };
    }

    return { message: "Login bem-sucedido!" };
  } catch (error) {
    console.log(error);
    return { error: "erro teste" };
  }
};
