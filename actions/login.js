"use server";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values) => {
  const validaTedFields = LoginSchema.safeParse(values);

  if (!validaTedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validaTedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  console.log(error);
};
