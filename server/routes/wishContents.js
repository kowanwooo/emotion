const express = require('express');
const { LookContents } = require('../models/LookContents');
const router = express.Router();
const { WishContents } = require('../models/WishContents')


// router.post('/movie/CreateWish', (req, res) => {
//     const wish = new WishContents(req.body.variable);
//     // console.log(wish.title)
//     movieId = wish.movieId;
//     userFrom = wish.userFrom;

//     WishContents.findOne({ movieId: movieId, userFrom: userFrom }, (err, Contents) => {
//         if (!Contents) {
//             console.log('이미존재')
//             wish.save((err, lookup) => {
//                 if (err) return res.json({
//                     success: false,
//                     message: err,
//                 })
//                 return res.status(200).json({
//                     success: true
//                 })
//             })
//         }
//     })
// })

router.post('/movie/FetchWish', (req, res) => {
    const movieId = req.body.movieId
    const userFrom = req.body.userFrom
    console.log(movieId, userFrom)
 
    LookContents.findOne({movieId : movieId, userFrom : userFrom}, (err, contents) => {
        if (contents) {
            console.log('fatch : ',contents.wish)
            return res.json({ success: true, contents });
        } else return res.status(404).json({
            success: false
        })
    })
})

router.post('/movie/UpdateWish', (req, res) => {
    const movieId = req.body.movieId
    const userFrom = req.body.userFrom
    console.log(movieId, userFrom)

    LookContents.findOne({ movieId: movieId, userFrom: userFrom })
        .updateOne({ "wish": "☆" }, { "$set": { "wish": "★" } })
        .exec((err, contents) => {
            console.log("찜하기")
            if (contents) {
                return res.json({ success: true, contents });
            } else return res.status(404).json({
                success: false
            })
        })
})

router.post('/movie/DelWish', (req, res) => {
    const movieId = req.body.movieId
    const userFrom = req.body.userFrom
    console.log(movieId, userFrom)

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
    .sort({ createdAt: -1 })
    .exec((err, wishContents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, wishContents})
    })
})

module.exports = router;