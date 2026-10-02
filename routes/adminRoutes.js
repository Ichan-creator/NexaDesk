const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/authMiddleware");

router.get("/login", adminController.showLogin);
router.post("/login", adminController.login);
router.use(requireAdmin);
router.get("/", adminController.dashboard);
router.post(
    "/users/:id/toggle-status",
    adminController.toggleUserStatus
);

router.get(
    "/tickets/:id",
    adminController.viewTicket
);

router.post(
    "/tickets/:id/reply",
    adminController.replyToTicket
);

router.post(
    "/tickets/:id/update",
    adminController.updateTicket
);

module.exports = router;