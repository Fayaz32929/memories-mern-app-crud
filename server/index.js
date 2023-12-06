import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import PostRoutes from "./routes/posts.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api", PostRoutes);

const PORT = process.env.PORT || 5000;

mongoose
 .connect(process.env.CONNECTION_URL)
 .then(() => app.listen(PORT, () => console.log(`server Running on port ${PORT}`)))
 .catch((err) => console.log(err));

// mongoose.set("useFindAndModify", false);
