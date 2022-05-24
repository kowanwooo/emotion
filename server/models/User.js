const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: {
        String,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

//save발생시 비번에 소금침
userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

//비번 서로 검사
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//비번 맞으니까 토큰생성합니다
userSchema.methods.generateToken = function (cb) {
    var user = this;

    // 존맛탱으로 토큰생성
    var token = jwt.sign(user._id.toHexString(), "secretToken");

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.statics.findByToken = function (token, cb) {
    var user = this;
    //토큰 디코딩
    jwt.verify(token, "secretToken", function (err, decoded) {

        //userId를 사용하여 클라이언트 및 DB에서 토큰 확인
        user.findOne({ _id: decoded, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
