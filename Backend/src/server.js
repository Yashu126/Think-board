import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./Config/db.js";
import notesRoute from "./Routes/notesroute.js";
import rateLimiter from "./MiddleWare/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(rateLimiter);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());

app.use("/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../Application/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(path.resolve(), "Application", "dist", "index.html")
    );
  });
}
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
