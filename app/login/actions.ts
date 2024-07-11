"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !!user;
};

const formSchema = z.object({
  email: z.string().email().refine(checkEmailExists, {
    message: "이 이메일을 사용하는 계정이 존재하지 않습니다",
  }),
  password: z.string(),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    // find a user with the email
    // if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );

    // log the user in
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      // redirect "/profile"
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          email: [], // zod인 척하기
          password: ["비밀번호가 일치하지 않습니다"],
        },
      };
    }
  }
};
