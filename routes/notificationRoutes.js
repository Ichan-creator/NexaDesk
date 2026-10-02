const express = require("express");

const router = express.Router();

const notificationController =
  require("../controllers/notificationController");

const { requireLogin } =
  require("../middleware/authMiddleware");

router.get(
  "/",
  requireLogin,
  notificationController.list
);

router.post(
  "/:id/read",
  requireLogin,
  notificationController.markAsRead
);

router.post(
  "/read-all",
  requireLogin,
  notificationController.markAllAsRead
);

module.exports = router;