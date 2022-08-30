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
    //countD : 실제 문서 갯수, 조건에 맞는 컬럼 갯수를 빠르게 가져옴
    Board.countDocuments({}, (err, count) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            Board.find()
                .sort({ createdAt: -1 }) // 날짜 내림차순 정렬
                .skip(((Page - 1) * 5)) // 한페이지당 5개 씩
                .limit(5) // 출력갯수 5개 제한
                .populate("userFrom")
                .exec((err, boards) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, boards, count });
                })
        }
    })
})

router.post('/board/getBoardP', (req, res) => {
    const Page = req.body.page;
    Board.countDocuments({}, (err, count) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            Board.find()
                .sort({ views: -1 })
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

router.post('/board/deleteBoard', (req, res) => {
    Board.findOneAndDelete({ userFrom: req.body.userFrom, _id: req.body.boardFrom })
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, result })
        })
})

router.post('/board/:id', (req, res) => {
    Board.findOne({ _id: req.body.boardId }, (err, board) => {
        if (board) {
            board.views++;
            board.save();
            return res.json({ success: true, board, boardviews: board.views });
        } else return res.status(404).json({
            success: false
        })
    })
})

router.post('/board', (req, res) => {
    Board.findOne({ _id: req.body.boardFrom }, (err, board) => {
        if (board) {
            return res.json({ success: true, board, boardviews: board.views });
        } else return res.status(404).json({
            success: false
        })
    })
})


module.exports = router;