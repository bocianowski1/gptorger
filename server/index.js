import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import postRoutes from "./mongodb/routes/postRoutes.js";
import imageRoutes from "./mongodb/routes/imageRoutes.js";

import connectDB from "./mongodb/connect.js";

dotenv.config();
const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/post", postRoutes);
app.use("/api/image", imageRoutes);

app.get("/", (req, res) => {
  res.send("hello brah");
});

const start = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
