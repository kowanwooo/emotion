const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: { // 글을 생성한 날짜 
        type: Date,
        default: Date.now
    }
}, { timestamps: true });



const Board = mongoose.model('Boards', boardSchema);

module.exports = { Board };