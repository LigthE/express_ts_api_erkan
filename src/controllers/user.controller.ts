import type { NextFunction, Request, Response } from "express";
import { CreateUserTypeZ } from "../models/user.model";
import {
  createUserService,
  deleteUserById,
  getAllUsers,
  updateUserService,
} from "../services/user.service";
import { stat } from "node:fs";
import { getUserByIdService } from "../services/user.service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();
    console.log(users);
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

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const idInt = Number(id);
    const user = await getUserByIdService(idInt);

    if (!user) {
      return res.status(500).json({ status: "failed to get user by its ID" });
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const idInt = Number(id);
    const data = req.body;
    const user = await updateUserService(idInt, data);

    if (!user) {
      return res
        .status(500)
        .json({ status: "failed to update user by its ID" });
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const idInt = Number(id);
    const user = await deleteUserById(idInt);

    if (!user) {
      return res.status(500).json({ status: "failed to delete user" });
    }
    res.status(201).json(user).json({ status: "user deleted sucessfully" });
  } catch (error) {
    next(error);
  }
};
