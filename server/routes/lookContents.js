const express = require('express');
const router = express.Router();
const { LookContents } = require("../models/LookContents");

router.post('/movie/create', (req, res) => {
    const lookup = new LookContents(req.body);
    const movieId = req.body.movieId;
    const userFrom = req.body.userFrom;
    LookContents.findOne({ movieId: movieId, userFrom: userFrom }, (err, Contents) => {
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
    LookContents.find({ userFrom : req.body.userFrom })
    .sort({ createdAt: -1 })
    .exec((err, lookContents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, lookContents})
    })
})

module.exports = router;