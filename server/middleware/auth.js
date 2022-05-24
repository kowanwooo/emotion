const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증 처리하는 곳

  //클라이언트 토큰 가져와
  let token = req.cookies.x_auth;

  //find user after decoding
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
