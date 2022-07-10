const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

//=================================
//             Login
//=================================

router.post('/login', (req, res) => {

    //이메일을 DB에서 수색함
    User.findOne({ email: req.body.email }, (err, user) => {

        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //요기오면 이메일이 있단소리 일반비번이랑 해쉬비번 같은지 검사 
        user.comparePassword(req.body.password, (err, isMatch) => {

            if (!isMatch) //예외처리
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            //비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,
                        userName: user.name
                    })
            })
        })
    })
})

module.exports = router;