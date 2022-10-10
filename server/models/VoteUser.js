const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteuserSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    movieFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Contnets'
    },
    grade: {
        type: Number,

    },
    audience: {
        type: Number,

    },
    happy: {
        type: Number,

    },
    fear: {
        type: Number,

    },
    surprised: {
        type: Number,

    },
    angry: {
        type: Number,

    },
    sad: {
        type: Number,

    },
    neutral: {
        type: Number,

    },
    hate: {
        type: Number,

    },
}, { timestamps: true });

const VoteUser = mongoose.model('VoteUser', voteuserSchema);
module.exports = { VoteUser }