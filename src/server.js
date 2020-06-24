import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

sendSecretMail("developchb@innogrid.com", "로그인비밀키test"); //sendSecretMail 기능 테스트 //테스트 후 삭제!

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema }); //GraphQLServer에는 express 서버가 내장되어 있다.

server.express.use(logger("dev")); //express 서버에서 logger 미들웨어를 사용. 사실은 morgan 모듈이지! dev라는 옵션을 줌

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
