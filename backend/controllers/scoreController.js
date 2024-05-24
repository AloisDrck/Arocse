const Score = require('../models/Scoreboard');

// Contrôleur pour récupérer les 10 meilleurs scores
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Score.find().sort({ score: -1 }).limit(10);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour enregistrer un nouveau score
exports.addScore = async (req, res) => {
    const score = new Score({
        playerName: req.body.playerName,
        score: req.body.score
    });

    try {
        const newScore = await score.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Contrôleur pour supprimer un score
exports.deleteScore = async (req, res) => {
    try {
        const { id } = req.params;
        await Score.findByIdAndDelete(id);
        res.status(200).json({ message: 'Score supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Contrôleur pour récupérer les scores par playerName
exports.getScoresByPlayerName = async (req, res) => {
    const playerName = req.params.playerName;
    try {
        const scores = await Score.find({ playerName }).sort({ score: -1 });
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};