const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteuserSchema = mongoose.Schema({
    userFrom: {
        type: String,
        ref: 'User'
    },
    movieFrom: {
        type: String,
        ref: 'Contnets'
    },
    grade: {
        type: Number,
        default: 0
    },
    audience: {
        type: Number,
        default: 0
    },
    happy: {
        type: Number,
        default: 0
    },
    fear: {
        type: Number,
        default: 0
    },
    surprised: {
        type: Number,
        default: 0
    },
    angry: {
        type: Number,
        default: 0
    },
    sad: {
        type: Number,
        default: 0
    },
    neutral: {
        type: Number,
        default: 0
    },
    hate: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const VoteUser = mongoose.model('VoteUser', voteuserSchema);
module.exports = { VoteUser }