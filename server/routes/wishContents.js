const express = require('express');
const { LookContents } = require('../models/LookContents');
const router = express.Router();



router.post('/movie/FetchWish', (req, res) => {
    const movieId = req.body.variable.movieId
    const userFrom = req.body.variable.userFrom
 
    LookContents.findOne({movieId : movieId, userFrom : userFrom}, (err, contents) => {
        if (contents) {
            return res.json({ success: true, contents });
        } else return res.status(404).json({
            success: false
        })
    })
})

router.post('/movie/UpdateWish', (req, res) => {
    const movieId = req.body.variable.movieId
    const userFrom = req.body.variable.userFrom

    LookContents.findOne({ movieId: movieId, userFrom: userFrom })
        .updateOne({ "wish": "☆" }, { "$set": { "wish": "★" } })
        .exec((err, contents) => {
            if (contents) {
                return res.json({ success: true, contents });
            } else return res.status(404).json({
                success: false
            })
        })
})

router.post('/movie/DelWish', (req, res) => {
    const movieId = req.body.variable.movieId
    const userFrom = req.body.variable.userFrom

    LookContents.findOne({ movieId: movieId, userFrom: userFrom })
    .updateOne({ "wish": "★" }, { "$set": { "wish": "☆" } })
        .exec((err, contents) => {
            console.log("찜삭제하기")
            if (contents) {
                return res.json({ success: true, contents });
            } else return res.status(404).json({
                success: false
            })
        })
})

router.post('/movie/getWishContents',(req, res) => {
    LookContents.find({ userFrom : req.body.userFrom, wish : "★"})
    .sort({ updatedAt: -1 })
    .exec((err, wishContents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, wishContents})
    })
})

module.exports = router;