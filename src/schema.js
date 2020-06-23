//api 폴더의 모든 파일들을 schema 파일에서 한 번에 받음
//api 폴더 밑에 모든 폴더 밑의 모든 graphql 파일과 js 파일을 받아옴

import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql")); // ** : 모든 폴더, *.graphql은 모든 .graphql 파일 => api 폴더 밑의 모든 폴더에 속해있고 .graphql로 끝나는 모든 파일들 가져옴
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js")); //api 폴더 밑에는 resolver가 아닌 js 파일을 두면 안됨. 만약 resolver가 아닌 js 파일을 둔다면 문제가 생김

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
