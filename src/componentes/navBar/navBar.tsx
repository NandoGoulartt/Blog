import { useRouter } from "next/router";
import { useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <nav className="bg-gray-800 text-white p-4 absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">BlogGram</h1>
        {isLoggedIn ? (
          <button
            onClick={() => {
              console.log("Teste");
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Perfil
          </button>
        ) : (
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
