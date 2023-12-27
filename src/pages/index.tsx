import NavBar from "@/componentes/navBar/navBar";
import Postagem from "@/componentes/postagem/postagem";
import { useAuth } from "@/contexto/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export type Postagem = {
  _id: string,
  title: string;
  thumbnail: string;
  content: string;
  usuario: any;
}

export default function Home() {
  const { dadosSessao } = useAuth();
  const [posts, setPosts] = useState<Postagem[] |[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/postagem');
        if (response.ok) {
          const postsData = await response.json();
          console.log(postsData)
          setPosts(postsData);
        } else {
          throw new Error('Erro ao buscar postagens');
        }
      } catch (error) {
        console.error('Erro ao buscar postagens:', error);
      }
    }

    fetchPosts();
  }, []);

  const handleNewPost = () => {
    router.push("/postagem/novaPostagem");
  };

  return (
    <div>
      <NavBar />
      <main className="flex flex-col bg-gray-100 min-h-screen px-10 py-24">
        {dadosSessao && (
          <button onClick={handleNewPost} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4">
            Nova Postagem
          </button>
        )}
        <div className="grid grid-cols-1 justify-center gap-6">
          {posts.map((post) => (
            <Postagem key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
