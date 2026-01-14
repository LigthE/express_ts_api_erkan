import express, { type Request, type Response } from "express";
import { timeStamp } from "node:console";
import userRoutes from "../src/routes/user.routes";

export const createApp = () => {
  const app = express();

  // routes
  app.use("/api/users", userRoutes);

  app.use(express.json());
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timeStamp: new Date().toISOString() });
  });

  return app;
};
