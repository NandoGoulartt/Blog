/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Postagem({ post }: any) {
  return (
    <div className="block mb-6">
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="flex items-center">
          <span className="text-black font-bold">@{post.usuario?.nome}</span>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 md:mr-4">
            <img
              src={post.thumbnail}
              alt="Thumbnail"
              className="w-full h-auto mb-4 rounded"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <div className="flex-1 md:ml-4 mt-4 md:mt-0">
            <div className="mb-4">
              <h2 className="text-black text-xl font-bold mb-2 text-center">{post.title}</h2>
              <p className="text-black overflow-hidden max-h-56">
                <span dangerouslySetInnerHTML={{ __html: post.content }} />
              </p>
              <Link href={`/postagem/viewPostagem?id=${post._id}`}>
                <p className="text-center py-2 cursor-pointer rounded-md hover:bg-gray-200 bg-gray-300 transition duration-300">
                  Clique para ver mais!
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
