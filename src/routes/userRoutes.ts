import express, { Router } from "express";
import { getUserController } from "../Provider.js";

const routes: Router = express.Router();

routes.get("/users", (req, res) => getUserController().listUsers(req, res));
routes.post("/login", (req, res) => getUserController().userLogin(req, res));
routes.post("/users/register", (req, res) => getUserController().userRegister(req, res));
routes.put("/users/update/:id", (req, res) => getUserController().userUpdate(req, res));
routes.delete("/users/delete/:id", (req, res) => getUserController().userDelete(req, res));

export default routes; 