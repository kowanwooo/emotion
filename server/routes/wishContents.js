const express = require('express');
const router = express.Router();
const { WishContents } = require('../models/WishContents')


router.post('/movie/CreateWish', (req, res) => {
    const wish = new WishContents(req.body.variable);
    // console.log(wish.title)
    movieId = wish.movieId;
    userFrom = wish.userFrom;

    WishContents.findOne({ movieId: movieId, userFrom: userFrom }, (err, Contents) => {
        if (!Contents) {
            console.log('이미존재')
            wish.save((err, lookup) => {
                if (err) return res.json({
                    success: false,
                    message: err,
                })
                return res.status(200).json({
                    success: true
                })
            })
        }
    })
})

router.post('/movie/FetchWish', (req, res) => {
    const movieId = req.body.movieId
    const userFrom = req.body.userFrom
    console.log(movieId, userFrom)
 
    WishContents.findOne({movieId : movieId, userFrom : userFrom}, (err, contents) => {
        if (contents) {
            console.log(contents)
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

    WishContents.findOne({ movieId: movieId, userFrom: userFrom })
        .updateOne({ "wish": "☆" }, { "$set": { "wish": "★" } })
        .exec((err, contents) => {
            if (contents) {
                return res.json({ success: true, contents });
            } else return res.status(404).json({
                success: false
            })
        })
})

module.exports = router;