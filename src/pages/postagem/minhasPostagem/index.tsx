import Loading from "@/componentes/loading/loading";
import NavBar from "@/componentes/navBar/navBar";
import Postagem from "@/componentes/postagem/postagem";
import { useAuth } from "@/contexto/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export type Postagem = {
  _id: string,
  title: string;
  thumbnail: string;
  content: string;
  usuario: any;
}

export default function MinhasPostagem() {
  const { dadosSessao } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState<Postagem[] | null>(null);

  useEffect(() => {
    async function fetchUserPosts(userId: string | string[]) {
      try {
        const response = await fetch(`/api/postagem/postagemId?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar as postagens');
        }
        const data = await response.json();
        setPost(data); 
      } catch (error) {
        console.error('Erro ao buscar as postagens:', error);
      }
    }

    if (router.query.userid) {
      const userId = router.query.userid;
      fetchUserPosts(userId); 
    }
  }, [router.query.userid]);

  if (!post) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <NavBar />
      <main className="flex flex-col bg-gray-100 min-h-screen px-10 py-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Gerencie suas postagens</h1>
        <div className="grid grid-cols-1 justify-center gap-6">
          {post.map((item) => (
            <Postagem key={item._id} post={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
