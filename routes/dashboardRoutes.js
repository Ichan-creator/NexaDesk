const express = require("express");

const router = express.Router();

const dashboardController =
  require("../controllers/dashboardController");

const {
  requireAuth
} = require("../middleware/authMiddleware");

const flash =
  require("../middleware/flash");

router.use(flash);

router.get(
  "/dashboard",
  requireAuth,
  dashboardController.index
);

module.exports = router;