const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const { requireAdmin } = require("../middleware/authMiddleware");

// ========================================
// ADMIN LOGIN
// These routes MUST be before requireAdmin
// ========================================

router.get("/login", adminController.showLogin);

router.post("/login", adminController.login);

// ========================================
// ADMIN PROTECTED ROUTES
// ========================================

router.use(requireAdmin);

// ========================================
// ADMIN DASHBOARD
// ========================================

router.get("/", adminController.dashboard);

// ========================================
// USER STATUS
// ========================================

router.post(
    "/users/:id/toggle-status",
    adminController.toggleUserStatus
);

// ========================================
// VIEW TICKET
// ========================================

router.get(
    "/tickets/:id",
    adminController.viewTicket
);

// ========================================
// REPLY TO TICKET
// ========================================

router.post(
    "/tickets/:id/reply",
    adminController.replyToTicket
);

// ========================================
// UPDATE TICKET
// ========================================

router.post(
    "/tickets/:id/update",
    adminController.updateTicket
);

module.exports = router;