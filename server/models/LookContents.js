const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LookContentsSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Contents'
    },
    posterUrl: {
        type: String
    },
    wish: {
        type: String
    }

}, { timestamps: true });

const LookContents = mongoose.model('LookContents', LookContentsSchema);
module.exports = { LookContents }