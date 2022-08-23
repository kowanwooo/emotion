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

router.post('/login/:id', (req, res) => {
    Contents.findOne({ _id: req.body.movieDbId }, (err, contents) => {
        if (contents) {
            return res.json({ success: true, contents });
        } else return res.status(404).json({
            success: false
        })
    })
})

module.exports = router;