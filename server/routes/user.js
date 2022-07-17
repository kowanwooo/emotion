const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { auth } = require("../middleware/auth");
const { User } = require("../models/User");
const { Board } = require("../models/Board");


//=================================
//             User
//=================================

router.get('/', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (user) return res.status(200).json({
            id: req.user.id,
            email: req.user.email,
            nickname: req.user.nickname,
            entranceYear: req.user.entranceYear,
            school: req.user.school,
        })
        else return res.status(404).send();
    })
})

router.post("/myBoard", (req, res) => {
    Board.find({ userFrom: req.body.userFrom })
        .sort({ createdAt: -1 })
        .exec((err, boards) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, boards })
        })
})
// router.get('/profile', auth, (req, res) => {
//     User.findOne({ _id: req.user._id }, (err, user) => {
//         if (user) return res.status(200).json({
//             id: req.user.id,
//             name: req.user.name,
//         })
//         else return res.status(404).send();
//     })
// })


module.exports = router;