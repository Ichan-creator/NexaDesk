const express = require("express");

const router = express.Router();

const pageController =
  require("../controllers/pageController");

const {
  requireAuth
} = require("../middleware/authMiddleware");

const flash =
  require("../middleware/flash");

router.use(requireAuth);
router.use(flash);

router.get(
  "/knowledge-base",
  pageController.knowledgeBase
);

router.get(
  "/profile",
  pageController.profile
);

router.post(
  "/profile",
  pageController.updateProfile
);

router.post(
  "/profile/password",
  pageController.changePassword
);

router.get(
  "/notifications",
  pageController.notifications
);

router.post(
  "/notifications/:id/read",
  pageController.markNotificationRead
);

module.exports = router;