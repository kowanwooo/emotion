const express = require('express');
const router = express.Router();
const { LookUps } = require("../models/LookUps");

router.post('/movie/lookup', (req, res) => {
    const lookup = new LookUps(req.body);
    movieId = req.body.movieId;
    userFrom = req.body.userFrom;
    LookUps.findOne({ movieId: movieId, userFrom: userFrom }, (err, Contents) => {
        if (!Contents){
            lookup.save((err, lookup) => {
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

router.post('/movie/getLookContents',(req, res) => {
    LookUps.find({ userFrom : req.body.userFrom })
    .sort({ createdAt: -1 })
    .exec((err, lookContents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, lookContents})
    })
})

module.exports = router;