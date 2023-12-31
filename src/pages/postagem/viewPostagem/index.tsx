/* eslint-disable @next/next/no-img-element */
import Loading from "@/componentes/loading/loading";
import NavBar from "@/componentes/navBar/navBar";
import { useAuth } from "@/contexto/auth";
import { Postagem } from "@/pages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewPostagem() {
  const router = useRouter();
  const { dadosSessao } = useAuth();
  const [post, setPost] = useState<Postagem | null>(null);

  useEffect(() => {
    async function fetchPostById(postId: string | string[]) {
      try {
        const response = await fetch(`/api/postagem/postagemId?id=${postId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar a postagem');
        }
        const data = await response.json();
        console.log(data[0])
        setPost(data[0]); 
      } catch (error) {
        console.error('Erro ao buscar a postagem:');
      }
    }

    if (router.query.id) {
      const postId = router.query.id;
      fetchPostById(postId); 
    }
  }, [router.query.id]);

  if (!post) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <NavBar />
      <main className="flex flex-col items-center justify-center bg-gray-100 min-h-screen px-10 py-24">
        <div key={post._id} className="bg-white p-2 shadow-md  rounded-md min-w-[70%]">
          <div className="flex-row flex justify-between">
          <span className="text-black"><span className="text-black font-bold">Autor:</span> {post.usuario?.nome}</span>
          {dadosSessao && post.usuario?._id === dadosSessao.usuario._id && (
                  <button onClick={() => router.push(`/postagem/editarPostagem?id=${post._id}`)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ml-2">
                Editar
              </button>
          )}
          </div>

          <div className="text-center">
          <h2 className="text-black text-xl font-bold">{post.title}</h2>
          <img
            src={post.thumbnail}
            alt="Thumbnail"
            className="max-w-full h-auto mb-4 mx-auto"
            style={{ maxWidth: "300px" }}
          />
          <p className="text-black" dangerouslySetInnerHTML={{ __html: post.content }}></p>
          {dadosSessao && (
            <div className="flex mt-4 justify-start">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2">
                Like 0
              </button>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Comment</button>
            </div>
          )}

          
          </div>
          <div className="mt-4">
            <h3 className="text-black">Comentários:</h3>
            {/* <ul>
              {post.comments.map((comment: string, index: number) => (
                <li key={index} className="text-black">
                  {comment}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </main>
    </div>
  );
}
