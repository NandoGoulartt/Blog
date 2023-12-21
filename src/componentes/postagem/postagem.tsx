import { useAuth } from "@/contexto/auth";

export default function Postagem({ post }: any) {
  const { dadosSessao } = useAuth();

  return (
    <div key={post.id} className="bg-white p-4 shadow-md rounded-md">
      <span>{post.usuario}</span>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <div>{post.thumbnail}</div>
      <p>{post.content}</p>
      {dadosSessao && (
        <div className="flex mt-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2">
            Like ({post.likes})
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
            Comment
          </button>
        </div>
      )}

      <div className="mt-4">
        <h3>Comentários:</h3>
        <ul>
          {post.comments.map((comment: string, index: number) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
