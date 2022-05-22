import { Router } from "express";
import usersRoute from "./api/users.routes";

const routes = Router();

routes.use('/users', usersRoute);

export default routes;