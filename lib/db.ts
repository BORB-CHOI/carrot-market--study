import { PrismaClient } from "@prisma/client";

// typescript로 db와 대화할 수 있는 Client를 생성
const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.create({
    data: {
      token: "121212",
      user: {
        connect: {
          id: 2,
        },
      },
    },
  });

  console.log(token);
}

test();

export default db;
