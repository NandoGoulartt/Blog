import { FormEvent, useState, useRef } from "react";
import NavBar from "@/componentes/navBar/navBar";
import Link from "next/link";
import { useAuth } from "@/contexto/auth";
import { useForm } from "react-hook-form";

export default function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [erro, setErro] = useState("");

  const OnSubmit = async (data: any) => {
    await login(data.email, data.senha);
  };

  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4">Entrar</h1>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              {...register("senha", { required: true })}
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
