import { FormEvent, useState } from "react";
import NavBar from "@/componentes/navBar/navBar";
import Link from "next/link";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Username:", nome);
    console.log("Password:", senha);

    setNome("");
    setSenha("");
  };

  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Entrar</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Nome de usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
              Entrar
            </button>
            <Link className="text-blue-500 mt-2 hover:underline" href="/createAccount">
              Ainda não tenho uma conta!
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}
