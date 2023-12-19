import NavBar from "@/componentes/navBar/navBar";
import Postagem from "@/componentes/postagem/postagem";
import { useState, useEffect } from "react";

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
  const [posts, setPosts] = useState<post[]>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setPosts(blogPosts);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLike = (postId: number) => {
    const updatedPosts = posts?.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId: number, comment: string) => {
    const updatedPosts = posts?.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div>
      <NavBar />
      <main className="flex flex-col min-h-screen px-10 py-24">
        <div className="grid grid-cols-1 gap-6">
          {posts?.map((post, index) => (
            <Postagem key={index} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
