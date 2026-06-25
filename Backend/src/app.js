import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import idCardRoutes from "./routes/idCardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notFound from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/idcards", idCardRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorMiddleware);

export default app;