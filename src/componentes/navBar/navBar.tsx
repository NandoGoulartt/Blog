import { useAuth } from "@/contexto/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavBar() {
  const { dadosSessao, logout } = useAuth();
  const router = useRouter();
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handlePerfil = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const handleSair = async () => {
    await logout();
    setMostrarMenu(false);
    router.push("/");
  };

  const handleIrParaPerfil = () => {
    router.push("/perfil");
    setMostrarMenu(false);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">BlogGram</h1>
        {dadosSessao ? (
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                console.log("Notificações");
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Notificações
            </button>
            <div className="relative">
              <button onClick={handlePerfil} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                Perfil
              </button>
              {mostrarMenu && (
                <div className="absolute right-0 mt-1 bg-white w-32 text-black rounded shadow-md">
                  <button onClick={handleIrParaPerfil} className="block w-full px-4 py-2 text-left hover:bg-gray-600">
                    Ir para perfil
                  </button>
                  <button onClick={handleSair} className="block w-full px-4 py-2 text-left hover:bg-gray-600">
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
