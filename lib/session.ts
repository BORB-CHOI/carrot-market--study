import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

// 쿠키 받거나 만들기
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "karrot-session",
    password: process.env.SESSION_SECRET as string,
  });
}
