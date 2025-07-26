import z from "zod";

export const LoginValidator = {
  schema: z.object({
    email: z.email().min(1, "Must enter a valid email"),
    password: z.string().min(1, "Must enter a password"),
  }),

  defaultValues: {
    email: "",
    password: "",
  },
};
export const SigninValidator = {
  schema: z.object({
    name: z.string().min(1, "Must enter a name"),
    email: z
      .email({ message: "Must enter a valid email" })
      .min(1, "Must enter an email"),
    password: z.string().min(1, "Must enter a password"),
  }),

  defaultValues: {
    name: "",
    email: "",
    password: "",
  },
};
