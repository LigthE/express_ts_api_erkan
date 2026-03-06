import type { NextFunction, Request, Response } from "express";
import { CreateUserTypeZ } from "../models/user.model";
import { createUserService, getAllUsers } from "../services/user.service";
import { stat } from "node:fs";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();

    if (!users) {
      return res.status(404).json({ status: "no users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request<{}, {}, CreateUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newUser = await createUserService(data);

    if (!newUser) {
      return res.status(500).json({ status: "failed to create user" });
    }
    res.status(201).json({ status: "user crated sucessfully", user: newUser });
  } catch (error) {
    next(error);
  }
};
