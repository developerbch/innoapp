import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        userName,
        email,
        name = "",
        bio = "",
        sex,
        birth,
        phone,
        transportation,
        userType,
      } = args;
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
