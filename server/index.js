const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth"); //인증 미들웨어
const { User } = require("./models/User"); //데이터베이스 스키마(표)
const { Board } = require("./models/Board"); //데이터베이스 스키마(표)

//바디파서 기본으로 박는거
app.use(bodyParser.urlencoded({ extended: true }));

//이것도 기본으로 박아요
app.use(bodyParser.json());
app.use(cookieParser());

//몽고디비 연결부분
const mongoose = require("mongoose");
mongoose
    .connect('mongodb+srv://root:1234@test.ucwj7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World! Hi"));


app.post('/api/users/register', (req, res) => {

    //회원 가입 할떄 필요한 정보들을  client(프론트)에서 가져오면 
    //그것들을  DB에 넣어준다. 
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {

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
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

// role 1 어드민    role 2 특정 부서 어드민 
// role 0 -> 일반유저   role 0이 아니면  관리자 
app.get('/api/users/auth', auth, (req, res) => {
    //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})
app.get('/api/users/logout', auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" }
        , (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        })
})

app.get('/api/users/mypage', auth, (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

});

//----------------------------board crud
// 게시글 추가하기
app.post('/api/board/create', (req, res) => {
    const board = new Board(req.body)

    board.save((err, doc) => {
        if (err) return res.status(400).send(err);
        else res.status(200).json({ success: true, doc: doc })
    });
})

// 게시글 삭제
app.post('/api/board/delete', (request, response) => {
    Board.findOneAndDelete({ postId: request.body.postId, writer: request.body.writer }) // 이 두 조건에 해당하는 db모델 지우기. 
        .exec((err, doc) => {
            if (err) return response.status(400).send(err);
            else response.status(200).json({ success: true, doc: doc });
        })
})

//게시글 수정 요청
app.post('/api/board/update', (req, res) => {
    Board.findOneAndUpdate(
        { postId: req.body.postId },
        {
            $set: {
                writer: req.body.writer,
                title: req.body.title,
                content: req.body.content
            }
        })
        .exec((err, doc) => {
            if (err) return response.status(400).send(err);
            else response.status(200).json({ success: true, doc: doc });
        });

});

// 특정 게시글 내용 불러오기 요청
app.post('/api/board/getBoardDetail', (req, res) => {

    Favorite.find({ postId: req.body.postId })
        .exec((err, board) => {
            if (err) return response.status(400).send(arr)
            return response.status(200).json({ success: true, board })
        })


});

// 전체 게시글 내용 불러오기 요청
app.post('/api/board/getBoardList', (req, res) => {

    Favorite.find({ sort: { createdAt: -1 } })
        .exec((err, boards) => {
            if (err) return response.status(400).send(arr)
            return response.status(200).json({ success: true, boards })
        })

});


app.listen(port, () => {
    console.log(`Start Server WellCome!! http://localhost:${port}`)
});
