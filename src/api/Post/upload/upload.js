import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request; //request에서 user를 받아옴
      const {
        caption,
        location,
        files,
        uploadDate,
        latitude,
        longitude,
        obstacle,
      } = args; //우리 앱은 위치가 필수여서 nomadcoders강의와는 다르게 datamodel.prisma에서도 필수로 해놨고, 여기도 동일하게 기입하도록 만듦
      const post = await prisma.createPost({
        caption,
        location,
        uploadDate,
        latitude,
        longitude,
        obstacle,
        user: { connect: { id: user.id } },
      });
      files.forEach(
        //files가 URL들의 array 라는 것을 기억해야함
        async (file) =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          })
      );
      return post;
    },
  },
};
