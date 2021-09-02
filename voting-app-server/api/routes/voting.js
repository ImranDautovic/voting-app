const express = require("express");
const router = express.Router();
const voting_service = require("../services/voting_service");

router.get("/results", (req, res) => {
  voting_service.votingService.getVotingResults(req, res);
});

router.post("/upload", (req, res) => {
  voting_service.votingService.saveVotingFile(req, res);
});

module.exports = router;
