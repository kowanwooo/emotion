const express = require('express');
const { VoteUser } = require('../models/VoteUser');
const router = express.Router();

router.post('/createvote', (req, res) => {

    // console.log(req.body.data)

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
        hate: 0,
        voteresult : req.body.data.emotion[0]
    }

    const voteresult = req.body.data.emotion[0];
    variable[voteresult] = 1

    const vote = new VoteUser(variable)

    VoteUser.findOne({ userFrom: req.body.userFrom, movieFrom: req.body.movieFrom})
        .exec((err, contents) => {
            if (!contents) {
                vote.save((err, vote) => {
                    if (err) return res.json({success: false,message: err,})
                    return res.status(200).json({success: true})
                })
            }
        })
})

router.post('/votecontents', (req, res) => {
    VoteUser.aggregate([{ $match: { title: req.body.title } },
    {
        $group:
        {
            _id: '$title',
            Happy: { $sum: '$happy' },
            Fear: { $sum: '$fear' },
            Surprised: { $sum: '$surprised' },
            Angry: { $sum: '$angry' },
            Sad: { $sum: '$sad' },
            Neutral: { $sum: '$neutral' },
            Hate: { $sum: '$hate' },

        }
    }]).exec((err, contents) => {

        let isArray = true;

        if (contents.length !== 0) {
            const Array = [contents[0].Happy, contents[0].Fear, contents[0].Surprised,
            contents[0].Angry, contents[0].Sad, contents[0].Neutral, contents[0].Hate]

            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, Array, isArray })
        }
        const Array = [0, 0, 0, 0, 0, 0, 0]
        isArray = false;
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, Array, isArray })




    })

})

router.post('/votecheckuser',(req, res) =>{
    let userVote = '';
    
    console.log(req.body)
    VoteUser.findOne({userFrom: req.body.userFrom, movieFrom: req.body.movieId})
    .exec((err,contents) =>{
        let voteState = 1;
        if(contents){
            voteState = 0;
            userVote = contents.voteresult;
        }
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, voteState : voteState, userVote : userVote})
    })
})

module.exports = router;