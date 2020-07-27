import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } }); //post가 존재하면 id와 post는 args에서 온 것, user는 request(token)에서 온 것
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }, //where: {id, user}를 할 수는 없음. prisma에서는 될 수 없게 하기 때문
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You cant' do that. You are not owner.");
      }
    },
  },
};
