import { Router } from 'express';

import * as userController from "../../controllers/user.controllers";

const routes = Router();

routes.route('/').get(userController.getUsers).post(userController.createUser);

export default routes;