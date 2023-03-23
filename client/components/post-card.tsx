import { useStateContext } from "@/context/state-context";
import { Post } from "@/utils/types";

export default function PostCard({ _id, name, prompt, image }: Post) {
  const { posts, setPosts } = useStateContext();
  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/post/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: _id,
        }),
      });

      if (response.ok) {
        setPosts(posts.filter((post: Post) => post._id !== _id));
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="w-2/3 group relative overflow-hidden flex justify-center">
      <img
        className="h-full w-full object-contain shadow-lg"
        src={image}
        alt={`image of ${prompt}`}
      />
      <div
        className="absolute -bottom-48 flex py-4 px-2 bg-black/75 w-full min-h-[25%] 
                      transition-all duration-300 group-hover:bottom-0"
      >
        <h3 className="flex-1 text-white">{prompt}</h3>
        <div className="flex flex-col gap-2 items-start mx-4">
          <p className="flex justify-end text-white">By: {name}</p>
          <button
            onClick={async () => {
              const cofirmation = confirm(
                "Are you sure you want to delete this?"
              );
              if (cofirmation) await deletePost();
            }}
            className="text-white text-sm"
          >
            Delete This
          </button>
        </div>
      </div>
    </div>
  );
}
