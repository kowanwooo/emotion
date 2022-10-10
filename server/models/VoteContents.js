const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votecontentsSchema = mongoose.Schema({
    title: {
        type: String
    },
    grade: {
        type: Number
    },
    audience: {
        type: Number
    },
    emotion: {
        type: String
    },
    emotionDigit: {
        type: Number
    },
    happy: {
        type: Number
    },
    fear: {
        type: Number
    },
    surprised: {
        type: Number
    },
    angry: {
        type: Number
    },
    sad: {
        type: Number
    },
    neutral: {
        type: Number
    },
    hate: {
        type: Number
    },
}, { timestamps: true });

const VoteContents = mongoose.model('VoteContents', votecontentsSchema);
module.exports = { VoteContents }