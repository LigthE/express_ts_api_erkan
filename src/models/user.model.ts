import { z } from "zod";

export const createUserValidation = z.object({
  body: z.object({
    firstname: z.string("please enter a valid name").min(2),
    lastname: z.string("please enter lastname").min(2),
    email: z.email("enter your email please"),
    password: z.string("please enter a valid password").min(8),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];
