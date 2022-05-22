import { Request, Response, NextFunction } from 'express';

import UserService from '../services/user.service';

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);
    try {
        res.json({
            status: 'success',
            data: { ...user },
            message: 'User created successfully',
          });
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getUsers();
    try {
        res.json({
            status: 'success',
            data: users,
            message: 'User created successfully',
          });
    } catch (error) {
        next(error);
    }
}