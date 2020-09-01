import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        userName,
        email,
        name,
        bio = "",
        sex,
        birth,
        phone,
        transportation,
        userType,
      } = args;
      const exists = await prisma.$exists.user({ email });
      if (exists) {
        throw Error("This email is already taken.");
      }
      await prisma.createUser({
        userName,
        email,
        name,
        bio,
        sex,
        birth,
        phone,
        transportation,
        userType,
      });
      return true;
    },
  },
};
