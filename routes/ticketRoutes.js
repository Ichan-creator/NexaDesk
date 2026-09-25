const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const { requireAuth } = require("../middleware/authMiddleware");
const flash = require("../middleware/flash");

router.use(requireAuth);
router.use(flash);

// Ticket list
router.get("/", ticketController.list);

// Create ticket page
router.get("/new", ticketController.showCreate);

// Create ticket
router.post("/", ticketController.create);

// Ticket details
router.get("/:id", ticketController.details);

// Reply to ticket
router.post("/:id/reply", ticketController.reply);

module.exports = router;