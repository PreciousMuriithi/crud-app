const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    credits: { type: Number, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
