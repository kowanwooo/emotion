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
        .updateOne({ "wish": false }, { "$set": { "wish": true} })
        .exec((err, contents) => {
            if (contents) {
                return res.json({ success: true, contents });
            } else return res.status(404).json({
                success: false
            })
        })
})

router.put('/movie/DelWish', (req, res) => {
    const movieId = req.body.variable.movieId
    const userFrom = req.body.variable.userFrom

    LookContents.findOne({ movieId: movieId, userFrom: userFrom })
    .updateOne({ "wish": true }, { "$set": { "wish": false } })
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
    LookContents.find({ userFrom : req.body.userFrom, wish : true })
    .sort({ updatedAt: -1 })
    .limit(5)
    .exec((err, wishContents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, wishContents})
    })
})

module.exports = router;