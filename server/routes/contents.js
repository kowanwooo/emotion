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

router.post('/contents/Korea', (req, res) => {
    Contents.aggregate([
        { $match: { country: "한국" } },
        { $sample: { size: 5 } }
    ])
    .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})

router.post('/contents/America', (req, res) => {
    Contents.aggregate([
        {
            $match: {
                $or: [
                    { country: "미국" }, { country: "네덜란드" }, { country: "멕시코" },
                    { country: "영국" }, { country: "아일랜드" }, { country: "베트남" },
                    { country: "오스트레일리아" }, { country: "인도" }, { country: "카자흐스탄" },
                    { country: "홍콩" }, { country: "프랑스" }, { country: "캐나다" },
                ]
            }
        },
        { $sample: { size: 5 } }
    ])
    // .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})
router.post('/contents/Action', (req, res) => {
    Contents.aggregate([
        { $match: { genre: "액션" } },
        { $sample: { size: 5 } }
    ])
    .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})
router.post('/contents/Happy', (req, res) => {
    Contents.aggregate([
        { $match: { emotion: "행복" } },
        { $sample: { size: 5 } }
    ])
    .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})
router.post('/contents/Anger', (req, res) => {
    Contents.aggregate([
    { $match: { emotion: "분노" } },
    { $sample: { size: 5 } }
    ])
    .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})
router.post('/contents/Sadness', (req, res) => {
    Contents.aggregate([
    { $match: { emotion: "슬픔" } },
    { $sample: { size: 5 } }
    ])
    .limit(5)
        .exec((err, contents) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, contents });
        })
})
router.post('/contents/Random', (req, res) => {
    Contents.aggregate([
        {$sample: {size: 5}}
    ])
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
    Contents.aggregate([
        { $match: { emotion: "공포" } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '공포'});
    })
})

router.post(`/contents/emotion/surprised`,(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: "놀람" } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '놀람'});
    })
})

router.post('/contents/emotion/angry',(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: "분노" } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '분노'});
    })
})

router.post('/contents/emotion/sad',(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: "슬픔" } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '슬픔'});
    })
})

router.post('/contents/emotion/neutral',(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: "중립" } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '중립'});
    })
})

router.post('/contents/emotion/happy',(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: "행복" } },
        { $sample: { size: 5 } }
    ])
    // .aggregate({ $sample: { size: 5 })
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '행복'});
    })
})

router.post('/contents/emotion/hate',(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: "혐오" } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents, State: '혐오'});
    })
})

router.post('/contents/emotion/related',(req, res) =>{
    Contents.aggregate([
        { $match: { emotion: req.body.emotion } },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})

router.post('/contents/emotion/relatedgenre',(req, res) =>{
    
    let genre = req.body.genre
    for(let i = 0; i < genre.length; i++){
        if(genre[i] === '/'){
            genre = genre.substr(0,i);
            break;
        }
    }



    
    Contents.aggregate([
        { $match: { genre: {'$regex': genre }} },
        { $sample: { size: 5 } }
    ])
    .exec((err, contents) =>{
        if (err) return res.status(400).send(err);
        return res.status(200).json({success: true, contents});
    })
})


//=======================================================================

router.post('/login/:id', (req, res) => {
    Contents.findOne({ _id: req.body.movieDbId })
        .exec((err, contents) => {
            if (err) return res.status(404).json({ success: false })
            const emoCount = [
                contents.happy, contents.fear, contents.surprised, contents.angry,
                contents.sad, contents.neutral, contents.hate]
            const summaryLen = contents.summary.length / 3;
            const summary = [contents.summary.substring(0, summaryLen), contents.summary.substr(summaryLen)];
            return res.json({ success: true, contents, emoCount, summary });

        })
})







//=================================
//            MoreContents
//=================================

router.post('/more/:emotionId', (req, res) => {
    const Page = req.body.page;
    const variable = req.body.emotionId

    if(variable === 'manyspectators' ){ // 관객순
        Contents.countDocuments({}, (err, count) => {
            if (err) { return res.status(400).send(err); }
            Contents.find({})
                .skip(((Page - 1) * 20))
                .limit(20)
                .exec((err, content) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, content, count, State: '관객순' })
                })
        })

    } else if (variable === 'latestorder') { // 최신순
        Contents.countDocuments({}, (err, count) => {
            if (err) { return res.status(400).send(err); }
            else {
                Contents.find({})
                    .sort({ releaseDate: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count, State: '최신순' })
                    })
            }
        })


    } else if (variable === 'korea') {
        Contents.countDocuments({ country: "한국" }, (err, count) => {
            if (err) { return res.status(400).send(err); }
            Contents.aggregate([
                { $match: { country: "한국" } },
            ])
                .skip(((Page - 1) * 20))
                .limit(20)
                .exec((err, content) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, content, count, State: '한국영화' })
                })

        })

    } else if (variable === 'fcountry') {
        Contents.countDocuments({
            $or: [
                { country: "미국" }, { country: "네덜란드" }, { country: "멕시코" },
                { country: "영국" }, { country: "아일랜드" }, { country: "베트남" },
                { country: "오스트레일리아" }, { country: "인도" }, { country: "카자흐스탄" },
                { country: "홍콩" }, { country: "프랑스" }, { country: "캐나다" },
            ]
        }, (err, count) => {
            if (err) { return res.status(400).send(err); }
            Contents.aggregate([
                {
                    $match: {
                        $or: [
                            { country: "미국" }, { country: "네덜란드" }, { country: "멕시코" },
                            { country: "영국" }, { country: "아일랜드" }, { country: "베트남" },
                            { country: "오스트레일리아" }, { country: "인도" }, { country: "카자흐스탄" },
                            { country: "홍콩" }, { country: "프랑스" }, { country: "캐나다" },
                        ]
                    }
                },
            ])
                .skip(((Page - 1) * 20))
                .limit(20)
                .exec((err, content) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, content, count, State: '외국영화' })
                })

        })
    } else if (variable === 'action') {
        Contents.countDocuments({ genre : "액션" }, (err, count) => {
            if (err) { return res.status(400).send(err); }
            Contents.aggregate([
                { $match: { genre : "액션" } },
            ])
                .skip(((Page - 1) * 20))
                .limit(20)
                .exec((err, content) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, content, count, State: '액션영화' })
                })

        })
        
    } 

    else if(variable === 'mywish' ){
        LookContents.countDocuments({userFrom : req.body.userFrom, wish : true}, (err, count) => {
            if (err) { return res.status(400).send(err);} 
            else {
                LookContents.find({userFrom : req.body.userFrom, wish : true})
                    .sort({ createdAt: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count, State: '찜한 콘텐츠'})
                    })
            }
        })
    }

    else if(variable === 'myvisit' ){
        LookContents.countDocuments({userFrom : req.body.userFrom}, (err, count) => {
            if (err) { return res.status(400).send(err);} 
            else {
                LookContents.find({userFrom : req.body.userFrom})
                    .sort({ createdAt: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count, State: '방문한 콘텐츠'})
                    })
            }
        })
    }
    
    else {
        Contents.countDocuments({ emotion: variable }, (err, count) => {
            if (err) { return res.status(400).send(err); } else {
                Contents.find({ emotion: variable })
                    .sort({ releaseDate: -1 })
                    .skip(((Page - 1) * 20))
                    .limit(20)
                    .exec((err, content) => {
                        if (err) return res.status(400).send(err);
                        res.status(200).json({ success: true, content, count, State: `${variable} 콘텐츠` })
                    })
            }
        })
    }


})


// router.post('/movie/getWishContents',(req, res) => {
//     LookContents.find({ userFrom : req.body.userFrom, wish : "★"})
//     .sort({ updatedAt: -1 })
//     .limit(5)
//     .exec((err, wishContents) =>{
//         if (err) return res.status(400).send(err);
//         return res.status(200).json({success: true, wishContents})
//     })
// })



module.exports = router;