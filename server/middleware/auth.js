const { User } = require('../models/User');

// 인증처리 미들웨어 생성
let auth = (req, res, next) => {

   // 클라이언트 쿠키에서 토큰을 가져온다.
   let token = req.cookies.x_auth;

   // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
   User.findByToken(token, (err, user) => {
      if (err) throw err;
      if (!user)
         return res.json({
         isAuth: false,
         error: true
      });

      req.token = token; // 복호화 된 token 저장
      req.user = user; // 복호화 된 user 저장
      next(); // post.auth 로 돌아가기 : next 안쓰면 이 미들웨어에 갇히게 된다.
   })
}

module.exports = { auth };