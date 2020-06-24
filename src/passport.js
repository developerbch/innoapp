/**passport는 인증 관련한 모든 일을 함. JWT토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 serialize(저장)함.
 * 토큰에서 정보를 가져와서 (express의) request에 붙여줌. 토큰을 가져와서 해독한 후에 사용자 객체를 request에 추가해줌. 이걸 자동으로 해줌. 물론 직접 수동으로 할 수도 있긴 함.
 * */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import JWTStrategy from "passport-jwt";

//secret은 passport 정보를 암호화하는데 필요한 비밀값임. secret의 보안을 잘 지켜야함
const jwtOptions = {
  jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization 헤더에서 jwt를 찾는 역할을 함 ex) {Authorization: 'Bearer TOKEN'}
  secret: process.env.JWT_SECRET, //secret은 토큰을 암호화하기 위한 문자열이다. //randomkeygen.com에서 아무거나 하나 복붙해서 줬음
};

//done은 우리가 사용자를 찾았을 때 호출해야하는 함수다.
//verifyUser 함수 안에서 User를 payload의 정보로 찾아야함
const verifyUser = (payload, done) => {
    try{
        //try catch 안에서 사용자를 찾는 건 다음 커밋에서 해볼게용 안뇽
    }
};

passport.use(new JWTStrategy(jwtOptions, verifyUser)); //확인용 callback 함수도 추가해야됨. 옵션이 잘 맞게 적용되었을 때 JwtStrategy함수가 토큰을 해석할 것임
