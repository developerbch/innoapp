//아래는 JWT를 가져와서 해석하고 확인하는 작업들 / JWT를 생성하진 않았음. utils에 generateToken함수를 만들어서 사용!

/**passport는 인증 관련한 모든 일을 함. JWT토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 serialize(저장)함.
 * 토큰에서 정보를 가져와서 (express의) request에 붙여줌. 토큰을 가져와서 해독한 후에 사용자 객체를 request에 추가해줌. 이걸 자동으로 해줌. 물론 직접 수동으로 할 수도 있긴 함.
 * */
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

//secret은 passport 정보를 암호화하는데 필요한 비밀값임. secret의 보안을 잘 지켜야함
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Authorization 헤더에서 jwt를 찾는 역할을 함 ex) {Authorization: 'Bearer TOKEN'}
  secretOrKey: process.env.JWT_SECRET, //secret은 토큰을 암호화하기 위한 문자열이다. //randomkeygen.com에서 아무거나 하나 복붙해서 줬음
};

//done은 우리가 사용자를 찾았을 때 호출해야하는 함수다.
//verifyUser 함수 안에서 User를 payload의 정보로 찾아야함
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id }); //만약 사용자를 찾으면, donme(null, user)를 리턴하면 됨.
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// 이건미들웨어 함수임. 그래서 req, res, next를 인자로 받음 //passport는 쿠키와 세션 작업을 하기에 좋음. 쿠키를 가져오고 만들어주고 모든 일을 함
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next); //이 함수에서는 apssport에 어떤 것도 입력되지 않기를 원해서 sessions: false 옵션을 추가함

passport.use(new Strategy(jwtOptions, verifyUser)); //확인용 callback 함수도 추가해야됨. 옵션이 잘 맞게 적용되었을 때 JwtStrategy함수가 토큰을 해석할 것임
passport.initialize();
