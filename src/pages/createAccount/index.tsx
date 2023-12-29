import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import NavBar from "@/componentes/navBar/navBar";
import { useForm } from "react-hook-form";
import LoadingButton from "@/componentes/button/button";
import { useAuth } from "@/contexto/auth";
import router from "next/router";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const OnSubmit = async (data: any) => {
    setIsLoading(true)
    setErro("");
    try {
      const response = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const responseLogin = await login(responseData.email, responseData.senha);
        if (responseLogin.ok) {
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        console.error("Erro ao criar conta:", response.statusText);
        setErro(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-black">Cadastro</h1>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <input
              type="text"
              placeholder="Nome de usuário"
              {...register("nome", { required: true })}
              className="border text-black border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Endereço de e-mail"
              {...register("email", { required: true })}
              className="border text-black border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              {...register("senha", { required: true })}
              className="border text-black border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <LoadingButton isLoading={isLoading} texto="Cadastrar" />
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
