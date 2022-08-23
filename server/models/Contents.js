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
}, { timestamps: true });

const Contents = mongoose.model('Contents', contentsSchema);
module.exports = { Contents }