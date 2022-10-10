const express = require('express');
const { VoteUser } = require('../models/VoteUser');
const router = express.Router();

router.post('/createvote', (req, res) => {
    console.log(req.body.title)
    console.log(req.body.data.emotion[0])

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

    // for(let i = 0; i<=Object.keys(variable).length; i++){
    //     // console.log(Object.keys(variable)[i] === req.body.data.emotion[0]);
    //     if(Object.keys(variable)[i] === req.body.data.emotion[0]){
    //         console.log(Object?.values(variable)[i])
    //     }
    // }
    // console.log(variable)


    
    const vote = new VoteUser(variable)
    VoteUser.findOne({ userForm: variable.userFrom, movieFrom: variable.movieFrom }, (err, Contents) => {
        if (!Contents){
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