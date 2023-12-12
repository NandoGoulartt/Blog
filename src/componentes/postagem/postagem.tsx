import { useState } from "react";

export default function Postagem({post}:any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLike = () => {
//
  };

  const handleComment = () => {
//
  };

  return (
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
  );
}
