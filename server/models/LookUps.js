const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lookupSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type: String
    },
    movieId: {
        type: String
    },
    posterUrl: {
        type: String
    },

}, { timestamps: true });

const LookUps = mongoose.model('LookUps', lookupSchema);
module.exports = { LookUps }