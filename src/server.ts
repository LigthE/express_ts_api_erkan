import dotenv from "dotenv";
import { createApp } from "./app";
import { pool } from "./config/db";
import { error } from "node:console";

dotenv.config();

pool.connect()
.then (() => console.log("db connected suceesfully "))
.catch((error) => console.error("Failed to connect to the database:", error));

const startServer = async () => {
  try {
    // testar database connect
    await pool.connect();
    console.log("Connected to the database successfully.");
    // Starta servern
    const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {//den hanterar error ifall de blir error jag får sms failed 
    //annars det blir ingen fara 
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
