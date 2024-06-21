"use server";
import { z } from "zod";

const usernameSchema = z.string().min(6).max(20);

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm-password"),
  };

  usernameSchema.parse(data.username);
  console.log(data);
}
