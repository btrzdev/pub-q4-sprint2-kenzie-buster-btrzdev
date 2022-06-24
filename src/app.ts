import express from "express";
import userRoutes from "./routes/user.routes";
import dvdRoutes from "./routes/dvd.routes";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/dvds", dvdRoutes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
