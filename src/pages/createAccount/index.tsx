import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import NavBar from "@/componentes/navBar/navBar";

export default function Cadastro() {
  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const [erro, setErro] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");

    if (nomeRef.current && emailRef.current && senhaRef.current) {
      const nome = nomeRef.current.value;
      const email = emailRef.current.value;
      const senha = senhaRef.current.value;

      if (!nome || !email || !senha) {
        setErro("Por favor, preencha todos os campos.");
        return;
      }

      try {
        const response = await fetch("/api/usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, senha }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Conta criada com sucesso!", data);
        } else {
          console.error("Erro ao criar conta:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao enviar requisição:", error);
      }
    } else {
      setErro("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Nome de usuário"
              ref={nomeRef}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Endereço de e-mail"
              ref={emailRef}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              ref={senhaRef}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
              Cadastrar
            </button>
            {erro && <p className="text-black bg-red-300 w-full text-center my-2 rounded-md">{erro}</p>}

            <p className="mt-4">
              Já tem uma conta?
              <Link className="text-blue-500 hover:underline" href="/login">
                Faça login aqui.
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
