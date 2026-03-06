import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUsers,
} from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";
import { deleteUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", validate(createUserValidation), createUser);
userRoutes.get("/:id", getUserById);
userRoutes.patch("/:id", updateUsers);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
