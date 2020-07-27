import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __) => {
      return prisma.posts({ orderBy: "createdAt_DESC" });
    },
  },
};
//기존에 강의대로 하면 follow한 사람들의 게시물만 feed에 나타나게 되는데, 우리 앱의 경우 공공기관이 공지글 개념으로 게시하기 때문에 필요없다고 판단하여 위와 같이 코딩함

//----------강의 상 코드------------------------
// import { prisma } from "../../../../generated/prisma-client";

// export default {
//   Query: {
//     seeFeed: async (_, __, { request, isAuthenticated }) => {
//       isAuthenticated(request);
//       const { user } = request;
//       const following = await prisma.user({ id: user.id }).following();
//       return prisma.posts({
//         where: {
//           user: {
//             id_in: [...following.map(user => user.id), user.id]
//           }
//         },
//         orderBy: "createdAt_DESC"
//       });
//     }
//   }
// };
