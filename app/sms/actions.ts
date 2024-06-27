"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "잘못된 번호 형식입니다."
  );

// 유저가 input에 무언가를 입력하면 그건 자동으로 string으로 변환된다. coerce(강제).number()를 사용하면 string을 number로 변환할 수 있다.
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const data = {
    phone: formData.get("phone"),
    token: formData.get("token"),
  };

  if (!prevState.token) {
    const result = phoneSchema.safeParse(data.phone);
    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(data.token);
    if (!result.success) {
      return { token: true, error: result.error.flatten() };
    } else {
      redirect("/");
    }
  }
}
