const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    userId: String,
    title: String,
    text: String
})




module.exports = mongoose.model('Journal', JournalSchema);