import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    sayHello: async () => {
      console.log(await prisma.users()); //데이터베이스에서 모든 사용자들을 가져와 console.log로 보여줌 //이런 식으로 prisma와 정보를 주고 받음 //이렇게 하면 prisma엔드포인트를 보호할 수 있음(localhost:4000으로 들어가면 나오는 playground)
      return "HELLO";
    },
  },
};

//사람들이 서버에 정보를 요청 -> 서버는 prisma 요청 ===> 이렇게 하는게 사람들이 서버에 직접 요청하도록 하는 것보다 더 안전함
//프론트엔드 -> 서버 -> prisma
