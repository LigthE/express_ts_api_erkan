import dotenv from "dotenv";
import { createApp } from "./app";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017";

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.info("💉 loook u have connected to MONGO DB - CONGRATULSIONs");
    const app = createApp();

    app.listen(PORT, () => {
      console.log(
        `server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("404 ERROR FAILED MISERABLY TO START THE SERVER", error);
    process.exit(1);
  }
};

startServer();
