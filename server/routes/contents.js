const express = require('express');
const router = express.Router();
const { Contents } = require("../models/Contents");

//=================================
//            Contents
//=================================

router.post('/contents/getContents', (req, res) => {
    Contents.find({})
        .sort({ releaseDate: -1 })
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})

router.post('/contents/getContentsP', (req, res) => {
    Contents.find({})
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})

//=================================
//            Contents
//=================================

router.post('/contents/emotion/fear',(req, res) =>{
    Contents.find({emotion:'공포'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post(`/contents/emotion/surprised`,(req, res) =>{
    Contents.find({emotion:'놀람'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/angry',(req, res) =>{
    Contents.find({emotion:'분노'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/sad',(req, res) =>{
    Contents.find({emotion:'슬픔'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/neutral',(req, res) =>{
    Contents.find({emotion:'중립'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/happy',(req, res) =>{
    Contents.find({emotion:'행복'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/hate',(req, res) =>{
    Contents.find({emotion:'혐오'})
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

//=======================================================================

router.post('/login/:id', (req, res) => {
    Contents.findOne({ _id: req.body.movieDbId }, (err, contents) => {
        if (contents) {
            return res.json({ success: true, contents });
        } else return res.status(404).json({
            success: false
        })
    })
})

//=================================
//            MoreContents
//=================================

router.post('/more/:emotionId', (req, res) => {
    const Page = req.body.page;
    const variable = req.body.emotionId
    console.log(variable)

    if(variable === 'manyspectators' ){
        Contents.countDocuments({}, (err, count) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                Contents.find({})
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count })
                    })
            }
        })

    }else if(variable === 'latestorder' ){
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