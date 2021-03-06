import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        userName,
        email,
        name,
        bio,
        avatar,
        sex,
        birth,
        phone,
        transportation,
        userType,
      } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: {
          userName,
          email,
          name,
          bio,
          avatar,
          sex,
          birth,
          phone,
          transportation,
          userType,
        },
      });
    },
  },
};
