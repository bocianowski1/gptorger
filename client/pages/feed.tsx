import PostCard from "@/components/post-card";
import { useStateContext } from "@/context/state-context";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import LoadingCircle from "@/components/loading-circle";
import Link from "next/link";
import { Post } from "@/utils/types";

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts, setActiveSection } = useStateContext();

  useEffect(() => {
    setActiveSection("feed");
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/post`, {
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

    void getPosts();
  }, []);

  return (
    <section className="flex flex-col my-16">
      <div className="flex items-center flex-col my-4 px-4 overflow-hidden">
        <m.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          transition={{ delay: 0.5, duration: 0.75 }}
          className="backdrop-contrast-100 font-extrabold text-transparent text-4xl bg-clip-text 
                          bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500
                          lg:text-6xl"
        >
          DISCOVER IMAGES
        </m.h1>
        <m.h3
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.25, duration: 0.75 }}
          className="backdrop-contrast-100 backdrop-blur-sm text-gray-800 py-1 lg:text-xl"
        >
          CREATED BY THE COMMUNITY
        </m.h3>
      </div>
      <div className="h-screen overflow-scroll pt-8 pb-64">
        <div
          className="gap-8 my-4 h-fit 
                      grid grid-cols-1 place-items-center
                      md:grid-cols-2 lg:grid-cols-4"
        >
          {posts.length > 0 ? (
            posts.map((post: Post) => {
              const { _id, name, prompt, image } = post;
              return (
                <PostCard
                  _id={_id}
                  name={name}
                  prompt={prompt}
                  image={image}
                  key={_id}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center w-screen h-screen">
              {loading ? (
                <div className="flex justify-center items-center">
                  <LoadingCircle />
                </div>
              ) : (
                <div className="flex flex-col gap-2 justify-center items-center">
                  <h2>No posts {":("}</h2>
                  <Link href={"/image-generation"}>
                    <h3 className="underline font-bold text-2xl">
                      Try creating one!
                    </h3>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
