const express = require('express');
const router = express.Router();
const { Contents } = require("../models/Contents");
const { LookContents } = require('../models/LookContents');

//=================================
//            Contents
//=================================

router.post('/contents/getContents', (req, res) => {
    Contents.find({})
        .sort({ releaseDate: -1 })
        .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})

router.post('/contents/getContentsP', (req, res) => {
    Contents.find({})
    .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})

//=================================
//            EmotionContents
//=================================

router.post('/contents/emotion/fear',(req, res) =>{
    Contents.find({emotion:'공포'})
    .limit(5)
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post(`/contents/emotion/surprised`,(req, res) =>{
    Contents.find({emotion:'놀람'})
    .limit(5)
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/angry',(req, res) =>{
    Contents.find({emotion:'분노'})
    .limit(5)
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/sad',(req, res) =>{
    Contents.find({emotion:'슬픔'})
    .limit(5)
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/neutral',(req, res) =>{
    Contents.find({emotion:'중립'})
    .limit(5)
    .aggregate({ $sample: { size: 5 }})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/happy',(req, res) =>{
    Contents.find({emotion:'행복'})
    .limit(5)
    // .aggregate({ $sample: { size: 5 })
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/hate',(req, res) =>{
    Contents.find({emotion:'혐오'})
    .limit(5)
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

//=======================================================================

router.post('/login/:id', (req, res) => {
    Contents.findOne({ _id: req.body.movieDbId })
    .exec((err, contents) => {
        if (err) return res.status(404).json({success: false})
        return res.json({ success: true, contents });
    })
})

//=================================
//            MoreContents
//=================================

router.post('/more/:emotionId', (req, res) => {
    const Page = req.body.page;
    const variable = req.body.emotionId
    // console.log(variable)

    if(variable === 'manyspectators' ){ // 관객순
        Contents.countDocuments({}, (err, count) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                Contents.find({})
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count, State :'관객순' })
                    })
            }
        })

    }else if(variable === 'latestorder' ){ // 최신순
        Contents.countDocuments({}, (err, count) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                Contents.find({})
                    .sort({ releaseDate: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count, State :'최신순' })
                    })
            }
        })
    
    
    }else if(variable === 'mylooksmore' ){
        LookContents.countDocuments({}, (err, count) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                LookContents.find({})
                    .sort({ createdAt: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count })
                    })
            }
        })
    }else{

        Contents.countDocuments({ emotion: variable }, (err, count) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                Contents.find({ emotion: variable })
                    .sort({ releaseDate: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count })
                    })
            }
        })
    }


})




module.exports = router;