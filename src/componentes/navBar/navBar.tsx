import { useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica para fazer login, definindo isLoggedIn como true
    setIsLoggedIn(true);
    // Aqui você pode adicionar a lógica real de login
  };

  return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">BlogGram</h1>
          {isLoggedIn ? (
            <button
              onClick={() => {
                // Lógica para redirecionar para o perfil do usuário
                // Substitua a lógica de redirecionamento conforme necessário
                console.log("Redirecionar para o perfil do usuário");
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Perfil
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Login
            </button>
          )}
        </div>
      </nav>

  );
}
