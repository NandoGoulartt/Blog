import { useState, useEffect } from "react";

// Exemplo de dados das postagens do blog (simulação)
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
  // Adicione mais postagens conforme necessário
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Aqui você pode carregar as postagens do seu blog
    // Simulando a carga das postagens para este exemplo
    setPosts(blogPosts);
  }, []);

  const handleLogin = () => {
    // Lógica para fazer login, definindo isLoggedIn como true
    setIsLoggedIn(true);
    // Aqui você pode adicionar a lógica real de login
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div>
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
      <main className="flex flex-col min-h-screen px-10 py-24">
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 shadow-md rounded-md">
              <span>{post.usuario}</span>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div>{post.thumbnail}</div>
              <p>{post.content}</p>
              {isLoggedIn && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2"
                  >
                    Like ({post.likes})
                  </button>
                  <button
                    onClick={() => {
                      const comment = prompt("Digite seu comentário:");
                      if (comment) {
                        handleComment(post.id, comment);
                      }
                    }}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  >
                    Comment
                  </button>
                </div>
              )}

              <div className="mt-4">
                <h3>Comentários:</h3>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
