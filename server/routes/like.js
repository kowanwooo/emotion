const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");

//=================================
//              Like
//=================================

router.post('/like/likeCounts', (req, res) => {
    Like.find({ boardFrom: req.body.boardFrom })
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, likes, likeCounts: likes.length });
        })
})

router.post("/like/liked", (req, res) => {
    Like.find({ userFrom: req.body.userFrom, boardFrom: req.body.boardFrom })
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            let result = false;
            if (likes.length !== 0) {
                result = true;
            }
            return res.status(200).json({ success: true, liked: result });
        })
})

router.post('/like/', (req, res) => {
    const like = new Like(req.body);
    like.save((err, likes) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true });
    })
})

router.post('/like/dislike', (req, res) => {
    Like.findOneAndDelete({ userFrom: req.body.userFrom, boardFrom: req.body.boardFrom })
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, likes })
        })
})

router.post('/like/likes', (req, res) => {
    Like.find({ userFrom: req.body.userFrom })
        .sort({ createdAt: -1 })
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, likes })
        })
})

module.exports = router;