const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const authRouter = require('./routes/auth');
const logoutRouter = require('./routes/logout');
const mypageRouter = require('./routes/mypage');
const boardRouter = require('./routes/board');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const likeRouter = require('./routes/like');
const contentsRouter = require('./routes/contents');
const LookContentsRouter = require('./routes/LookContents');
const WishContentsRouter = require('./routes/wishContents');
const voteContentsRouter = require('./routes/voteContents');
const voteuserRouter = require('./routes/voteuser');

//=================================
//            mongoose
//=================================
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//=================================
//            router
//=================================
app.use('/api/users', registerRouter);
app.use('/api/users', loginRouter);
app.use('/api/users', authRouter);
app.use('/api/users', logoutRouter);
app.use('/api/users', mypageRouter);
app.use('/api/users', boardRouter);
app.use('/api/users', userRouter);
app.use('/api/users', commentRouter);
app.use('/api/users', likeRouter);
app.use('/api/users', contentsRouter);
app.use('/api/users', LookContentsRouter);
app.use('/api/users', WishContentsRouter);
app.use('/api/users', voteContentsRouter);
app.use('/api/users', voteuserRouter);

app.listen(port, () => {
    console.log(`Start Server WellCome!! http://localhost:${port}`)
});
