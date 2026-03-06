import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import { CreateUserTypeZ } from "../models/user.model";
import { AppError } from "../utils/app.error";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });

  return users;
};

export const createUserService = async (data: CreateUserTypeZ) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new AppError("an user with that email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: hashedPassword,
    },
  });
};
