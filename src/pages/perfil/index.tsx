import { useState } from "react";
import NavBar from "@/componentes/navBar/navBar";
import { useAuth } from "@/contexto/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Perfil() {
  const router = useRouter();
  const { dadosSessao, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [erro, setErro] = useState("");

  const OnSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: dadosSessao.usuario.email,
          novaSenha: data.senha,
          novoNome: data.nome,
          novoEmail: data.email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await login(data.email, data.senha);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar perfil:", response.statusText);
        setErro(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição de atualização:", error);
      setErro("Erro ao atualizar o perfil");
    }
  };

  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-black mb-4">Alterar Dados</h1>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <input
              type="text"
              placeholder="Nome"
              defaultValue={dadosSessao ? dadosSessao.usuario.nome : ""}
              {...register("nome", { required: true })}
              className="border border-gray-300 text-black rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Email"
              defaultValue={dadosSessao ? dadosSessao.usuario.email : ""}
              {...register("email", { required: true })}
              className="border text-black border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Senha"
              defaultValue={dadosSessao ? dadosSessao.usuario.senha : ""}
              {...register("senha", { required: true })}
              className="border text-black border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
              Alterar Dados
            </button>
            {erro && <p className="text-black bg-red-300 w-full text-center my-2 rounded-md">{erro}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}
