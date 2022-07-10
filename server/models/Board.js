const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    boardTitle: {
        type: String
    },
    boardContent: {
        type: String
    },
    boardWriter: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);
module.exports = { Board }