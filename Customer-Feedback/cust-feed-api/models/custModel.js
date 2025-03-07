const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    feedback: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Feedbacks', feedbackSchema)