const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentsSchema = mongoose.Schema({
    title: {
        type: String
    },
    releaseDate: {
        type: String
    },
    genre: {
        type: String
    },
    country: {
        type: String
    },
    parentalGuidance: {
        type: String
    },
    runningTime: {
        type: String
    },
    grade: {
        type: String
    },
    audience: {
        type: String
    },
    posterUrl: {
        type: String
    },
    actor: {
        type: String
    },
    actorUrl: {
        type: String
    },
    summary: {
        type: String
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

const Contents = mongoose.model('Contents', contentsSchema);
module.exports = { Contents }