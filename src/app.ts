import express, { Express } from "express";
import databaseConnection from "./database/dbConnection.js";
import routes from "./routes/index.js";
import cors from "cors";
import { initializeProvider } from "./Provider.js";

const app: Express = express();

const initializeApp = async () => {
    try {
        const connection = await databaseConnection();

        connection.on("error", (erro: Error) => {
            console.log("Não foi possivel conectar", erro);
        });

        connection.once("open", () => {
            console.log("Conectado com sucesso");
        });

        await initializeProvider();

        app.use(cors());
        app.use(express.json());
        routes(app);

        return app;
    } catch (error) {
        console.error("Error initializing app:", error);
        throw error;
    }
};

export default initializeApp(); 