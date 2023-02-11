import Link from "next/link";
import { useState } from "react";

const ImageGeneration = () => {
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await response.json();
      setLoading(false);
      setImage(`data:image/jpeg;base64,${data.image}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button className="bg-red-200 px-4 py-2" onClick={() => fetchImages()}>
        Generate
      </button>
      <button
        className="bg-red-200 mx-10 px-4 py-2"
        onClick={() => {
          setImage("");
          setPrompt("");
        }}
      >
        Clear
      </button>
      <input
        className="w-screen px-2"
        type={"text"}
        value={prompt}
        onChange={(e) => {
          e.preventDefault();
          setPrompt(e.target.value);
        }}
      />
      {!loading && (
        <div className="bg-red-200 h-64 w-64">
          <img src={image} alt={`image of ${prompt}`}></img>
        </div>
      )}
      <Link href={"/images"}>images</Link>
    </div>
  );
};

export default ImageGeneration;
