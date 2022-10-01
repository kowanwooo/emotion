const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishContentsSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Contents'
    },
    title: {
        type: String
    },
    posterUrl: {
        type: String
    },

    wish: {
        type: String
    }

}, { timestamps: true });

const WishContents = mongoose.model('WishContents', WishContentsSchema);
module.exports = { WishContents }