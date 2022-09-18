const express = require('express');
const router = express.Router();
const { LookUps } = require("../models/LookUps");

router.post('/movie/lookup', (req, res) =>{
    const lookup = new LookUps(req.body);
    lookup.save((err, lookup) =>{
        if (err) return res.json({
            success : false,
            message : err,
        })
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/movie/getMovieId',(req, res) => {
    LookUps.find({ userFrom : req.body.userFrom })
    .sort({ createdAt: -1 })
    .exec((err, movieId) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, movieId})
    })
})

module.exports = router;