import FormField from "@/components/form-field";
import { useStateContext } from "@/context/state-context";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    imageURL: "",
  });

  const { imageURL, setImageURL } = useStateContext();

  const handleSubmit = () => {};
  const handleChange = (e: any) => {};
  const generateImage = async () => {};

  return (
    <section className="flex flex-col h-screen py-24">
      <div>
        <h1>Create</h1>
      </div>

      <div className="bg-red-200">
        <img src={imageURL} alt="image" className="w-40 h-40 object-cover" />
      </div>

      <form onSubmit={handleSubmit}>
        <FormField
          labelText="Name"
          name="name"
          type="text"
          placeholder="Torger"
          value={form.name}
          handleChange={handleChange}
        />
        <FormField
          labelText="Prompt"
          name="prompt"
          type="text"
          placeholder="Prompt"
          value={form.prompt}
          handleChange={handleChange}
        />
      </form>
    </section>
  );
};

export default CreatePost;
