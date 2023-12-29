import { useState } from "react";
import NavBar from "@/componentes/navBar/navBar";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexto/auth";

type NovaPostagem = {
  title: string;
  thumbnail: string | ArrayBuffer | null;
  content: string;
  usuario: string;
};

const DynamicJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function NovaPostagem() {
  const { dadosSessao } = useAuth();
  const [newPostData, setNewPostData] = useState<NovaPostagem>({
    title: "",
    thumbnail: null,
    content: "",
    usuario: dadosSessao?.usuario?._id || ""
  });
  const router = useRouter();


  const handleCreatePost = async () => {
    try {
      const response = await fetch("/api/postagem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta da criação de postagem:", data);
        router.push("/");
      } else {
        throw new Error("Erro ao criar postagem");
      }
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostData({
          ...newPostData,
          thumbnail: reader.result,
        });
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const contentFieldChanged = (content: string) => {
    setNewPostData({ ...newPostData, content: content });
  };

  return (
    <div>
      <NavBar />
      <main className="flex justify-center items-center bg-gray-100 min-h-screen px-10 py-24">
        <div className="max-w-5xl w-full bg-white rounded shadow-lg">
          <div className="flex justify-between items-center border-b-2 p-4">
            <h2>Criar Nova Postagem</h2>
          </div>
          <div className="p-4 flex flex-col min-h-full">
            <label htmlFor="title" className="mb-2">
              Título:
            </label>
            <input
              type="text"
              id="title"
              value={newPostData.title}
              onChange={(e) =>
                setNewPostData({
                  ...newPostData,
                  title: e.target.value,
                })
              }
              placeholder="Insira o título"
              className="border-2 border-gray-300 p-2 mb-2 rounded-md w-full"
            />

            <label htmlFor="image" className=" mb-2">
              Anexar Imagem:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border-2 border-gray-300 p-2 mb-2 rounded-md w-full"
            />

            <label htmlFor="content" className="mb-2">
              Conteúdo:
            </label>
            <DynamicJoditEditor
              value={newPostData.content}
              onChange={(newContent) => contentFieldChanged(newContent)}
            />
          </div>
          <div className="flex justify-end p-4 border-t-2">
            <button onClick={handleCreatePost} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Criar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
