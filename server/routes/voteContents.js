const express = require('express');
const { VoteContents } = require('../models/VoteContents');
const router = express.Router();

router.post('/movie',(req, res) => {
    // console.log(req.body.variable.data.emotion[0]) // emoiton 투표상태
    console.log('bdoy',req.body)
    VoteContents.find({})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents})
    })
})

module.exports = router;