import { NextFunction, Request, Response } from "express";

import { IUserDto } from "../models/IUser";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserDto;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const result = await userService.getUserById(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body as IUserDto;
      const result = await userService.updateUser(userId, dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async partialUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body as IUserDto;
      const result = await userService.partialUpdateUser(userId, dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
