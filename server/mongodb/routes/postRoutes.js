import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import PostSchema from "../models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const posts = await PostSchema.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, image } = req.body;
    // const url = cloudinary.uploader.upload(image);

    const post = await PostSchema.create({
      name,
      prompt,
      image: image,
    });

    // 201 = created
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

router.route("/").delete(async (req, res) => {
  try {
    const { id } = req.body;
    const post = await PostSchema.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post deleted" });
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

export default router;
