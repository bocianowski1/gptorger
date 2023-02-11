import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import PostSchema from "../models/post.js";

const router = express.Router();

export default router;
