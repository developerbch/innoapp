import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT           //user.loginSecret이 secret과 같다면 JWT토큰을 리턴
        return "TOKEN";
      } else {
        throw Error("Wrong email/secret combination");
      }
    },
  },
};
