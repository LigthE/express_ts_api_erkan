import express from "express";
import productRoutes from "./routes/product.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use("/api/products/", productRoutes);

  return app;
};
