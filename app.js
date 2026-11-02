import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./src/config/database.js";
import { usersRouter } from "./src/routes/users.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser()); //para poder leer las cookies

// rutas
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
