"use server";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm-password"),
  };

  // try {
  //   formSchema.parse(data);
  // } catch (error) {
  //   console.log(error);
  // }
  // 위 방법은 매 번 try-catch를 사용해야 하므로 safeParse를 사용하는 것이 더 편하다.

  const result = formSchema.safeParse(data);
  if (result.success === false) {
    // console.log(result.error);
    // flatten을 쓰면 error를 더 쉽게 볼 수 있다.
    return result.error.flatten();
  }
}
