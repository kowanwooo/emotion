const express = require('express');
const { VoteUser } = require('../models/VoteUser');
const router = express.Router();

router.post('/createvote', (req, res) => {

    const variable = {
        userFrom: req.body.userFrom,
        movieFrom: req.body.movieFrom,
        title: req.body.title,
        grade: 0,
        audience: 0,
        happy: 0,
        fear: 0,
        surprised: 0,
        angry: 0,
        sad: 0,
        neutral: 0,
        hate: 0
    }
    variable[req.body.data.emotion[0]] = 1

    const vote = new VoteUser(variable)
    // console.log('vote:', vote)
    VoteUser.findOne({ userFrom: req.body.userFrom, movieFrom: req.body.movieFrom})
        .exec((err, contents) => {
            // console.log(contents)
            if (!contents) {
                vote.save((err, vote) => {
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

module.exports = router;