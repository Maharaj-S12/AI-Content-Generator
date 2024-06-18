const express = require("express");

const isAuthenticated = require("../middleware/isAuthenticated");
const { openAIController } = require("../controllers/openAIControllers");
const checkApiRequestLimit = require("../middleware/checkApiRequestLimit");
const openAIRouter = express.Router();

openAIRouter.post(
  "/generate-content",
  isAuthenticated,
  checkApiRequestLimit,
  openAIController
);

module.exports = openAIRouter;
