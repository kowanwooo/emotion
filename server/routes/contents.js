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

router.post('/contents/emotion/getFear',(req, res) =>{
    Contents.find({emotion:'공포'})
    .exec((err, fear) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, fear});
    })
})

router.post('/contents/emotion/getSurprised',(req, res) =>{
    Contents.find({emotion:'놀람'})
    .exec((err, surprised) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, surprised});
    })
})

router.post('/contents/emotion/getAngry',(req, res) =>{
    Contents.find({emotion:'분노'})
    .exec((err, angry) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, angry});
    })
})

router.post('/contents/emotion/getSad',(req, res) =>{
    Contents.find({emotion:'슬픔'})
    .exec((err, sad) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, sad});
    })
})

router.post('/contents/emotion/getNeutral',(req, res) =>{
    Contents.find({emotion:'중립'})
    .exec((err, neutral) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, neutral});
    })
})

router.post('/contents/emotion/getHappy',(req, res) =>{
    Contents.find({emotion:'행복'})
    .exec((err, happy) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, happy});
    })
})

router.post('/contents/emotion/getHate',(req, res) =>{
    Contents.find({emotion:'혐오'})
    .exec((err, hate) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, hate});
    })
})

router.post('/login/:id', (req, res) => {
    Contents.findOne({ _id: req.body.movieDbId }, (err, contents) => {
        if (contents) {
            return res.json({ success: true, contents });
        } else return res.status(404).json({
            success: false
        })
    })
})

router.post('/contents/moreContents', (req, res) => {
    const Page = req.body.page;
    Contents.countDocuments({},(err,count) =>{
        if(err) {
            return res.status(400).send(err);
        } else{
            Contents.find()
            .sort({ releaseDate: -1 })
            .skip(((Page - 1) * 20))
            .limit(20)
            .exec((err, content) =>{
                if(err) return res.status(400).send(err);
                res.status(200).json({success : true, content, count})
            })
        }
    })

})



module.exports = router;