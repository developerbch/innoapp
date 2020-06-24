import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id,
              },
            },
            {
              post: {
                id: postId,
              },
            },
          ],
        });
        if (existingLike) {
          // TO DO 만약 좋아요가 존재한다면, 이걸 지워야하는게 필요한데, 나중에 할 거임
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
