import dotenv from "dotenv";
import { createApp } from "./app";

dotenv.config();

const startServer = async () => {
  try {
    // testar database connect

    // Starta servern
    const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    //den hanterar error ifall de blir error jag får sms failed
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
