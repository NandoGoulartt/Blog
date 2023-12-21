import NavBar from "@/componentes/navBar/navBar";
import Postagem from "@/componentes/postagem/postagem";
import { useAuth } from "@/contexto/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const blogPosts = [
  {
    id: 1,
    title: "Postagem 1",
    thumbnail: "imagem postagem 1",
    content: "Conteúdo da postagem 1...",
    usuario: 2,
    likes: 0,
    comments: [],
  },
  {
    id: 2,
    title: "Postagem 2",
    thumbnail: "imagem postagem 2",
    content: "Conteúdo da postagem 2...",
    usuario: 1,
    likes: 0,
    comments: [],
  },
];

type post = {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  usuario: number;
  likes: number;
  comments: string[];
};

export default function Home() {
  const { dadosSessao } = useAuth();
  const [posts, setPosts] = useState<post[]>();
  const router = useRouter();

  useEffect(() => {
    setPosts(blogPosts);
  }, []);

  const handleNewPost = () => {
    router.push("/new-post");
  };

  return (
    <div>
      <NavBar />
      <main className="flex flex-col min-h-screen px-10 py-24">
        {dadosSessao && (
          <button
            onClick={handleNewPost}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
          >
            Nova Postagem
          </button>
        )}
        <div className="grid grid-cols-1 gap-6">
          {posts?.map((post, index) => (
            <Postagem key={index} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
