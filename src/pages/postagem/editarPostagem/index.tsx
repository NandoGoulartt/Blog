/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "@/componentes/navBar/navBar";
import dynamic from "next/dynamic";

type NovaPostagem = {
  title: string;
  thumbnail: string | ArrayBuffer | null;
  content: string;
  usuario: string;
};

const DynamicJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditarPostagem() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<NovaPostagem>({
    title: '',
    thumbnail: null,
    content: '',
    usuario: '',
  });
  useEffect(() => {
    async function fetchPostById(postId: string | string[]) {
      try {
        const response = await fetch(`/api/postagem/postagemId?id=${postId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar a postagem');
        }
        const data = await response.json();
        setPost(data[0]); 
      } catch (error) {
        console.error('Erro ao buscar a postagem:', error);
      }
    }

    if (router.query.id) {
        console.log(router.query.id)
      const postId = router.query.id;
      fetchPostById(postId); 
    }
  }, [router.query.id]);

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(`/api/postagem/postagemId?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();
        router.push("/");
      } else {
        throw new Error("Erro ao atualizar postagem");
      }
    } catch (error) {
      console.error("Erro ao atualizar postagem:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageString = reader.result?.toString() || '';
        setPost({
          ...post,
          thumbnail: imageString,
        });
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const contentFieldChanged = (content: string) => {
    setPost({ ...post, content: content });
  };

  if (!post) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <NavBar />
      <main className="flex justify-center items-center bg-gray-100 min-h-screen px-10 py-24">
        <div className="max-w-5xl w-full bg-white rounded shadow-lg">
          <div className="flex justify-between items-center border-b-2 p-4">
            <h2>Editar Postagem</h2>
          </div>
          <div className="p-4 flex flex-col min-h-full">
            {post && (
              <>
                <label htmlFor="title" className="mb-2">
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  value={post.title || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      title: e.target.value,
                    })
                  }
                  placeholder="Insira o título"
                  className="border-2 border-gray-300 p-2 mb-2 rounded-md w-full"
                />

                <label htmlFor="image" className="mb-2">
                  Trocar Imagem:
                </label>
                <div className="mb-2">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-2 border-gray-300 p-2 mb-2 rounded-md w-full"
                  />
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail as string}
                      alt="Imagem"
                      className="mt-2 max-w-xs"
                    />
                  )}
                </div>

                <label htmlFor="content" className="mb-2">
                  Conteúdo:
                </label>
                <DynamicJoditEditor
                  value={post.content || ""}
                  onChange={(newContent) => contentFieldChanged(newContent)}
                />
              </>
            )}
          </div>
          <div className="flex justify-end p-4 border-t-2">
            <button onClick={handleUpdatePost} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Atualizar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
