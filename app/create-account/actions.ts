"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkUsername = (username: string) => {
  return !username.includes("hi") ? true : false;
};

const checkPassword = (
  data: { password: string; confirm_password: string },
  ctx: z.RefinementCtx
) => {
  if (data.password !== data.confirm_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "비밀번호가 일치하지 않습니다.",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirm_password"],
      message: "비밀번호가 일치하지 않습니다.",
    });
  }
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) == false;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "사용자 이름은 문자 형식이어야 합니다.",
        required_error: "사용자 이름은 필수입니다.",
      })
      .toLowerCase()
      .trim()
      // .transform((username) => `변환된 ${username}`)
      .refine(checkUsername, "hi 금지")
      .refine(checkUniqueUsername, "이미 사용 중인 사용자 이름입니다."),
    email: z
      .string({
        message: "이메일 형식은 문자열이어야 합니다.",
      })
      .email({
        message: "이메일 형식이 올바르지 않습니다.",
      })
      .toLowerCase()
      .refine(checkUniqueEmail, "이미 사용 중인 이메일입니다."),
    password: z
      .string({
        message: "비밀번호 형식은 문자열이어야 합니다.",
      })
      .min(PASSWORD_MIN_LENGTH, "비밀번호가 너무 짧으세요."),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string({ message: "비밀번호 형식은 문자열이어야 합니다." })
      .min(PASSWORD_MIN_LENGTH, "비밀번호가 너무 짧다니깐?"),
  })
  // .refine(checkPassword, {
  //   message: "비밀번호가 일치하지 않습니다.",
  //   path: ["confirm_password", "password"],
  // })
  .superRefine(checkPassword);

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

  const result = await formSchema.safeParseAsync(data);
  if (result.success === false) {
    // console.log(result.error);
    // flatten을 쓰면 error를 더 쉽게 볼 수 있다.
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // check if username is taken
    // check if the email is already used

    // hash the password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // save the user to the db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    // log the user in
    // 쿠키 받거나 만들기
    const session = await getIronSession(cookies(), {
      cookieName: "karrot-session",
      password: process.env.SESSION_SECRET as string,
    });
    //@ts-ignore
    // 쿠키에 사용자 id 저장
    session.id = user.id;
    await session.save();

    // redirect to the '/'
    redirect("/profile");
  }
}
