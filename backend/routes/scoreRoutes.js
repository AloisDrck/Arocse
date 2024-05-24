const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// Route pour récupérer les 10 meilleurs scores
router.get('/', scoreController.getLeaderboard);

// Route pour enregistrer un nouveau score
router.post('/', scoreController.addScore);

// Route pour supprimer un score
router.delete('/:id', scoreController.deleteScore);

// Route pour récupérer les scores par playerName
router.get('/:playerName', scoreController.getScoresByPlayerName);

module.exports = router;
