import { PrismaClient } from "@prisma/client";

// typescript로 db와 대화할 수 있는 Client를 생성
const db = new PrismaClient();

export default db;
