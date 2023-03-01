import PostCard from "@/components/post-card";
import { useStateContext } from "@/context/state-context";
import React, { useEffect, useState } from "react";

interface Props {
  post: Post;
}

interface Post {
  _id: string;
  name: string;
  prompt: string;
  image: string;
}

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts, imageURL } = useStateContext();

  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    void getAllPosts();
  }, []);

  return (
    <section className="flex flex-col mt-16">
      <h1>Feed {posts.length}</h1>
      <div className="absolute z-20 h-screen overflow-scroll py-16">
        <div className="my-4 h-fit flex flex-col items-center">
          {posts.length > 0 ? (
            posts.map((post: Post) => {
              const { _id, name, prompt, image } = post;
              return (
                <PostCard
                  _id={post._id}
                  name={name}
                  prompt={prompt}
                  image={image}
                  key={_id}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center">No posts</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Feed;
