const db = require("../config/db");
exports.list = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const priority = req.query.priority || "";

    let query = `
      SELECT
        id,
        ticket_number,
        subject,
        category,
        priority,
        status,
        created_at,
        updated_at
      FROM tickets
      WHERE user_id = ?
    `;

    const params = [userId];

    if (search) {
      query += `
        AND (
          ticket_number LIKE ?
          OR subject LIKE ?
          OR category LIKE ?
        )
      `;

      const searchValue = `%${search}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue
      );
    }

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (priority) {
      query += " AND priority = ?";
      params.push(priority);
    }

    query += " ORDER BY updated_at DESC";

    const [tickets] = await db.execute(query, params);

    res.render("tickets", {
      title: "My Tickets",
      tickets,
      search,
      status,
      priority
    });

  } catch (error) {
    console.error("Ticket list error:", error);

    res.status(500).render("error", {
      title: "Tickets Error",
      message: "Unable to load your tickets."
    });
  }
};

exports.showCreate = (req, res) => {
  res.render("create-ticket", {
    title: "Create Ticket"
  });
};

exports.create = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const {
      subject,
      category,
      priority,
      description
    } = req.body;

    if (!subject || !category || !priority || !description) {
      req.session.error =
        "Please complete all required fields.";

      return res.redirect("/tickets/new");
    }

    // Create ticket
    const [result] = await db.execute(
      `INSERT INTO tickets
       (user_id, subject, category, priority, status, description)
       VALUES (?, ?, ?, ?, 'Open', ?)`,
      [
        userId,
        subject,
        category,
        priority,
        description
      ]
    );

    const ticketId = result.insertId;

    // Generate ticket number
    const year = new Date().getFullYear();

    const ticketNumber =
      `NEX-${year}-${String(ticketId).padStart(5, "0")}`;

    await db.execute(
      `UPDATE tickets
       SET ticket_number = ?
       WHERE id = ?`,
      [
        ticketNumber,
        ticketId
      ]
    );

    // Add timeline update
    await db.execute(
      `INSERT INTO ticket_updates
       (ticket_id, user_id, action, note)
       VALUES (?, ?, ?, ?)`,
      [
        ticketId,
        userId,
        "Ticket Created",
        "Ticket was submitted to the IT Service Desk."
      ]
    );

    req.session.success =
      `Ticket ${ticketNumber} was created successfully.`;

    res.redirect(`/tickets/${ticketId}`);

  } catch (error) {
    console.error("Create ticket error:", error);

    req.session.error =
      "Unable to create the ticket.";

    res.redirect("/tickets/new");
  }
};


// ================================
// Ticket Details
// ================================
exports.details = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const ticketId = req.params.id;

    const [tickets] = await db.execute(
      `SELECT
        t.*,
        u.full_name,
        u.email,
        u.department
       FROM tickets t
       JOIN users u
         ON t.user_id = u.id
       WHERE t.id = ?
       AND t.user_id = ?
       LIMIT 1`,
      [
        ticketId,
        userId
      ]
    );

    if (tickets.length === 0) {
      return res.status(404).render("error", {
        title: "Ticket Not Found",
        message: "The ticket does not exist or you do not have access to it."
      });
    }

    const ticket = tickets[0];

    const [updates] = await db.execute(
      `SELECT
        tu.*,
        u.full_name
       FROM ticket_updates tu
       JOIN users u
         ON tu.user_id = u.id
       WHERE tu.ticket_id = ?
       ORDER BY tu.created_at ASC`,
      [ticketId]
    );

    res.render("ticket-details", {
      title: ticket.ticket_number || "Ticket Details",
      ticket,
      updates
    });

  } catch (error) {
    console.error("Ticket details error:", error);

    res.status(500).render("error", {
      title: "Ticket Error",
      message: "Unable to load the ticket."
    });
  }
};

exports.reply = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const ticketId = req.params.id;

    const {
      message
    } = req.body;

    if (!message || !message.trim()) {
      req.session.error =
        "Please enter a message.";

      return res.redirect(`/tickets/${ticketId}`);
    }

    // Verify ticket belongs to user
    const [tickets] = await db.execute(
      `SELECT id, status
       FROM tickets
       WHERE id = ?
       AND user_id = ?
       LIMIT 1`,
      [
        ticketId,
        userId
      ]
    );

    if (tickets.length === 0) {
      return res.status(404).render("error", {
        title: "Ticket Not Found",
        message: "The ticket does not exist or you do not have access to it."
      });
    }

    const ticket = tickets[0];

    let action = "Reply Added";

    if (
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
    ) {
      action = "Ticket Reopened";

      await db.execute(
        `UPDATE tickets
         SET status = 'Open'
         WHERE id = ?`,
        [ticketId]
      );
    }

    await db.execute(
      `INSERT INTO ticket_updates
       (ticket_id, user_id, action, note)
       VALUES (?, ?, ?, ?)`,
      [
        ticketId,
        userId,
        action,
        message.trim()
      ]
    );

    req.session.success =
      "Your reply has been added.";

    res.redirect(`/tickets/${ticketId}`);

  } catch (error) {
    console.error("Ticket reply error:", error);

    req.session.error =
      "Unable to add your reply.";

    res.redirect(`/tickets/${req.params.id}`);
  }
};