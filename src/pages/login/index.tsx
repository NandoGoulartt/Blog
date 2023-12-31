import { FormEvent, useState, useRef } from "react";
import NavBar from "@/componentes/navBar/navBar";
import Link from "next/link";
import { useAuth } from "@/contexto/auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import LoadingButton from "@/componentes/button/button";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const OnSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await login(data.email, data.senha);
      if (response.ok) {
        router.push("/");
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
          <h1 className="text-2xl font-bold mb-4 text-black">Entrar</h1>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
              className="border border-gray-300 text-black rounded-md p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Senha"
              {...register("senha", { required: true })}
              className="border border-gray-300 text-black rounded-md p-2 mb-2 w-full"
            />
            <LoadingButton isLoading={isLoading} texto="Entrar" />
            
            {erro && <p className="text-black bg-red-300 w-full text-center my-2 rounded-md">{erro}</p>}

            <Link className="text-blue-500 mt-2 hover:underline" href="/createAccount">
              Ainda não tenho uma conta!
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}
