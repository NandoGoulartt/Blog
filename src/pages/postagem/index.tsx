import { useState } from "react";
import NavBar from "@/componentes/navBar/navBar";
import { useRouter } from "next/router";

type NewPostData = {
  title: string;
  thumbnail: string | ArrayBuffer | null;
  content: string;
};

export default function NewPostPage() {
  const [newPostData, setNewPostData] = useState<NewPostData>({
    title: "",
    thumbnail: null,
    content: "",
  });
  const router = useRouter();

  const handleCreatePost = () => {
    console.log("Nova postagem criada:", newPostData);
    router.push("/");
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

  return (
    <div>
      <NavBar />
      <main className="flex justify-center items-center bg-gray-100 min-h-screen px-10 py-24">
        <div className="max-w-5xl w-full bg-white rounded shadow-lg">
          <div className="flex justify-between items-center border-b-2 p-4">
            <h2>Criar Nova Postagem</h2>
          </div>
          <div className="p-4">
            <label htmlFor="title" className="block mb-2">
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

            <label htmlFor="image" className="block mb-2">
              Anexar Imagem:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="border-2 border-gray-300 p-2 mb-2 rounded-md w-full"
            />

            <label htmlFor="content" className="block mb-2">
              Conteúdo:
            </label>
            <textarea
              id="content"
              placeholder="Insira o conteúdo"
              value={newPostData.content}
              onChange={(e) =>
                setNewPostData({
                  ...newPostData,
                  content: e.target.value,
                })
              }
              className="border-2 border-gray-300 p-2 rounded-md w-full h-32 resize-none"
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
