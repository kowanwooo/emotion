const express = require('express');
const router = express.Router();
const { Board } = require("../models/Board");

//=================================
//             Board
//=================================

router.post('/board/upload', (req, res) => {
    const board = new Board(req.body);
    board.save((err, board) => {
        if (err) return res.json({
            success: false,
            message: err,
        })
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/board/getBoard', (req, res) => {
    const Page = req.body.page;
    Board.countDocuments({}, (err, count) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            Board.find()
                .sort({ createdAt: -1 })
                .skip(((Page - 1) * 5))
                .limit(5)
                .populate("userFrom")
                .exec((err, boards) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, boards, count });
                })
        }
    })
})


module.exports = router;