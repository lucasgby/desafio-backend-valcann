import { Router, Request, Response } from "express";
import { UserController } from "../controllers/userController";

const routes = Router();

routes.get('/health', (request: Request, response: Response) => {
  response.json({ status: "ok" });
})

routes.get('/users', UserController.getUsers);
routes.get('/users/:id', UserController.getUserById);

export { routes };