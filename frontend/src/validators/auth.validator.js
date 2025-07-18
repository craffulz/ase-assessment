import z from "zod";

export const LoginValidator = {
  schema: z.object({
    email: z.email(),
    password: z.string().min(1, "Must enter a password"),
  }),

  defaultValues: {
    email: "",
    password: "",
  },
};
export const SigninValidator = {
  schema: z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(1, "Must enter a password"),
  }),

  defaultValues: {
    name: "",
    email: "",
    password: "",
  },
};
