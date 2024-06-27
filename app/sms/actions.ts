"use server";

import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

// 유저가 input에 무언가를 입력하면 그건 자동으로 string으로 변환된다. coerce(강제).number()를 사용하면 string을 number로 변환할 수 있다.
const tokenSchema = z.coerce.number().min(100000).max(999999);

export async function smsLogin(prevState: any, formData: FormData) {
  const data = {
    number: formData.get("number"),
    token: formData.get("token"),
  };

  console.log(typeof formData.get("token"));
  console.log(typeof tokenSchema.parse(data.token));
}
