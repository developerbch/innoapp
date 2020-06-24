import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }),
}); //GraphQLServer에는 express 서버가 내장되어 있다. //context는 resolver 사이에서 정보를 공유할 때 사용함

server.express.use(logger("dev")); //express 서버에서 logger 미들웨어를 사용. 사실은 morgan 모듈이지! dev라는 옵션을 줌
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
