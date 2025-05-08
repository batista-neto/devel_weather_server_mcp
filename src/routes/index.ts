import express, { Express } from "express";
import users from "./userRoutes.js";

const routes = (app: Express) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Servidor DevelWeather");
    });

    app.use(express.json(), users);
};

export default routes; 