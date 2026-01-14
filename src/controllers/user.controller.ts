import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  const Users = [
    { id: 1, name: "dexter morgan", job: "forensics analyst" },
    {
      id: 2,
      name: "debra morgan",
      job: "captain",
    },
  ];
  res.status(200).json(Users);
};