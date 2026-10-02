const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.showLogin = (req, res) => {
    res.render("admin/login", {
        title: "Admin Login",
        error: req.session.error || null,
        success: req.session.success || null
    });

    delete req.session.error;
    delete req.session.success;
};

exports.login = async (req, res) => {
    try {

        console.log("DB TEST:", {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_NAME
        });

        const { username, password } = req.body;

        if (!username || !password) {
            req.session.error =
                "Please enter your admin username and password.";
            return res.redirect("/admin/login");
        }

        const [users] = await db.execute(
            `SELECT *
             FROM users
             WHERE username = ?
             LIMIT 1`,
            [username]
        );

        if (users.length === 0) {
            req.session.error =
                "Invalid admin username or password.";

            return res.redirect("/admin/login");
        }

        const user = users[0];

        if (!user.is_active) {
            req.session.error =
                "Your account is inactive. Please contact the administrator.";

            return res.redirect("/admin/login");
        }

        if (user.role !== "admin") {
            req.session.error =
                "You do not have administrator access.";

            return res.redirect("/admin/login");
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            req.session.error =
                "Invalid admin username or password.";

            return res.redirect("/admin/login");
        }

        req.session.user = {
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            email: user.email,
            department: user.department,
            role: user.role,
            is_active: user.is_active
        };

        req.session.success =
            "Welcome to the Admin Dashboard.";

        return res.redirect("/admin");

    } catch (error) {
        console.error("Admin login error:", error);

        req.session.error =
            "Unable to log in. Please try again.";

        return res.redirect("/admin/login");
    }
};

exports.dashboard = async (req, res) => {
    try {

        const [statsRows] = await db.execute(`
            SELECT
                COUNT(*) AS total,
                COALESCE(SUM(status = 'Open'), 0) AS open,
                COALESCE(SUM(status = 'In Progress'), 0) AS inProgress,
                COALESCE(SUM(status = 'Resolved'), 0) AS resolved,
                COALESCE(SUM(status = 'Closed'), 0) AS closed
            FROM tickets
        `);

        const stats = statsRows[0];

        const [tickets] = await db.execute(`
            SELECT
                t.*,
                u.full_name,
                u.email,
                u.department
            FROM tickets t
            INNER JOIN users u
                ON t.user_id = u.id
            ORDER BY t.updated_at DESC
            LIMIT 50
        `);

        const [users] = await db.execute(`
            SELECT
                id,
                full_name,
                username,
                email,
                department,
                role,
                is_active,
                created_at
            FROM users
            ORDER BY created_at DESC
        `);

        const [notifications] = await db.execute(
            `
            SELECT *
            FROM notifications
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT 10
            `,
            [req.session.user.id]
        );

        const success = req.session.success || null;
        const error = req.session.error || null;

        delete req.session.success;
        delete req.session.error;

        res.render("admin/dashboard", {
            title: "Admin Dashboard",
            stats,
            tickets,
            users,
            notifications,
            success,
            error
        });

    } catch (error) {
        console.error("Admin dashboard error:", error);

        res.status(500).render("error", {
            title: "Admin Error",
            message: "Unable to load administrator dashboard."
        });
    }
};

exports.toggleUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;

        const [users] = await db.execute(
            `
            SELECT
                id,
                full_name,
                role,
                is_active
            FROM users
            WHERE id = ?
            LIMIT 1
            `,
            [userId]
        );

        if (users.length === 0) {
            req.session.error = "User not found.";
            return res.redirect("/admin");
        }

        const user = users[0];

        if (user.id === req.session.user.id) {
            req.session.error =
                "You cannot deactivate your own administrator account.";

            return res.redirect("/admin");
        }

        const newStatus = user.is_active ? 0 : 1;

        await db.execute(
            `
            UPDATE users
            SET is_active = ?
            WHERE id = ?
            `,
            [newStatus, userId]
        );

        if (newStatus === 1) {
            req.session.success =
                `${user.full_name} has been activated successfully.`;
        } else {
            req.session.success =
                `${user.full_name} has been deactivated successfully.`;
        }

        return res.redirect("/admin");

    } catch (error) {
        console.error("Toggle user status error:", error);

        req.session.error =
            "Unable to update the user's status.";

        return res.redirect("/admin");
    }
};

exports.viewTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;

        const [tickets] = await db.execute(
            `
            SELECT
                t.*,
                u.full_name,
                u.email,
                u.department
            FROM tickets t
            INNER JOIN users u
                ON t.user_id = u.id
            WHERE t.id = ?
            LIMIT 1
            `,
            [ticketId]
        );

        if (tickets.length === 0) {
            req.session.error = "Ticket not found.";
            return res.redirect("/admin");
        }

        const ticket = tickets[0];

        const [updates] = await db.execute(
            `
            SELECT
                tu.*,
                u.full_name,
                u.role
            FROM ticket_updates tu
            INNER JOIN users u
                ON tu.user_id = u.id
            WHERE tu.ticket_id = ?
            ORDER BY tu.created_at ASC
            `,
            [ticketId]
        );

        res.render("admin/ticket-details", {
            title: `Ticket ${ticket.ticket_number}`,
            ticket,
            updates
        });

    } catch (error) {
        console.error("View ticket error:", error);

        res.status(500).render("error", {
            title: "Admin Error",
            message: "Unable to load ticket details."
        });
    }
};

exports.replyToTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const { note } = req.body;
        const adminId = req.session.user.id;

        if (!note || !note.trim()) {
            req.session.error =
                "Please enter a reply before submitting.";

            return res.redirect(
                `/admin/tickets/${ticketId}`
            );
        }

        const [tickets] = await db.execute(
            `
            SELECT *
            FROM tickets
            WHERE id = ?
            LIMIT 1
            `,
            [ticketId]
        );

        if (tickets.length === 0) {
            req.session.error = "Ticket not found.";
            return res.redirect("/admin");
        }

        const ticket = tickets[0];

        await db.execute(
            `
            INSERT INTO ticket_updates
                (ticket_id, user_id, action, note)
            VALUES
                (?, ?, 'Admin Reply', ?)
            `,
            [
                ticketId,
                adminId,
                note.trim()
            ]
        );

        await db.execute(
            `
            UPDATE tickets
            SET
                status = 'Resolved',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [ticketId]
        );

        await db.execute(
            `
            INSERT INTO notifications
                (user_id, title, message, type)
            VALUES
                (?, ?, ?, 'ticket')
            `,
            [
                ticket.user_id,
                "Ticket Updated",
                `Your ticket ${ticket.ticket_number} has received a reply from the Service Desk.`
            ]
        );

        req.session.success =
            `Reply sent for ticket ${ticket.ticket_number}.`;

        return res.redirect(
            `/admin/tickets/${ticketId}`
        );

    } catch (error) {
        console.error("Admin reply error:", error);

        req.session.error =
            "Unable to send the reply.";

        return res.redirect(
            `/admin/tickets/${req.params.id}`
        );
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;

        const {
            status,
            priority,
            note
        } = req.body;

        const adminId = req.session.user.id;

        const [tickets] = await db.execute(
            `
            SELECT *
            FROM tickets
            WHERE id = ?
            LIMIT 1
            `,
            [ticketId]
        );

        if (tickets.length === 0) {
            req.session.error = "Ticket not found.";
            return res.redirect("/admin");
        }

        const ticket = tickets[0];

        await db.execute(
            `
            UPDATE tickets
            SET
                status = ?,
                priority = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                status,
                priority,
                ticketId
            ]
        );

        if (note && note.trim()) {
            await db.execute(
                `
                INSERT INTO ticket_updates
                    (ticket_id, user_id, action, note)
                VALUES
                    (?, ?, 'Admin Update', ?)
                `,
                [
                    ticketId,
                    adminId,
                    note.trim()
                ]
            );
        }

        await db.execute(
            `
            INSERT INTO notifications
                (user_id, title, message, type)
            VALUES
                (?, ?, ?, 'ticket')
            `,
            [
                ticket.user_id,
                "Ticket Updated",
                `Your ticket ${ticket.ticket_number} was updated by the Service Desk.`
            ]
        );

        req.session.success =
            `Ticket ${ticket.ticket_number} updated successfully.`;

        return res.redirect("/admin");

    } catch (error) {
        console.error("Update ticket error:", error);

        req.session.error =
            "Unable to update ticket.";

        return res.redirect("/admin");
    }
};