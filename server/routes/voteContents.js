const express = require('express');
// const axios = require('axios');
const { VoteContents } = require('../models/VoteContents');
const { VoteUser } = require('../models/VoteUser');
const router = express.Router();

router.post('/votecontents', (req, res) => {
    // console.log(req.body)
    const title = req.body.title
    // const movieId = 
    const userFrom = req.body.userFrom
    console.log(req.body.movieId)
   

    VoteUser.find({ movieFrom: req.body.movieId })
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({success: true, contents})
        })
    
})



module.exports = router;

            
            // const emo = []
            // if (contents.length === 0) {
            //     for (let i = 0; i <= 6; i++) {
            //         emo.push(0)
            //     }
            // }
            // if (contents.length >= 1) {
            //     emo.push(contents[0].happy);
            //     emo.push(contents[0].fear);
            //     emo.push(contents[0].surprised);
            //     emo.push(contents[0].angry);
            //     emo.push(contents[0].sad);
            //     emo.push(contents[0].neutral);
            //     emo.push(contents[0].hate);
            // }
            // if (contents.length >= 2) {
            //     for (let i = 1; i <= contents.length - 1; i++) {
            //         emo[0] += contents[i].happy
            //         emo[1] += contents[i].fear
            //         emo[2] += contents[i].surprised
            //         emo[3] += contents[i].angry
            //         emo[4] += contents[i].sad
            //         emo[5] += contents[i].neutral
            //         emo[6] += contents[i].hate
            //     }
            // }