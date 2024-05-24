const mongoose = require('mongoose');

const scorboardSchema = mongoose.Schema({
    playerName: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scoreboard', scorboardSchema);