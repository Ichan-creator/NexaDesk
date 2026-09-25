const db = require("../config/db");

exports.index = async (req, res) => {
    try {
        // ===============================
        // GET TICKET STATISTICS
        // ===============================

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

        // ===============================
        // GET USER TICKETS
        // ===============================

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
            WHERE t.user_id = ?
            ORDER BY t.updated_at DESC
            `,
            [req.session.user.id]
        );

        // ===============================
        // GET RECENT TICKETS
        // ===============================

        const [recentTickets] = await db.execute(
            `
            SELECT
                t.*,
                u.full_name,
                u.email,
                u.department
            FROM tickets t
            INNER JOIN users u
                ON t.user_id = u.id
            WHERE t.user_id = ?
            ORDER BY t.created_at DESC
            LIMIT 5
            `,
            [req.session.user.id]
        );

        // ===============================
        // GET NOTIFICATIONS
        // ===============================

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

        // ===============================
        // RENDER DASHBOARD
        // ===============================

        res.render("dashboard", {
            title: "Dashboard",

            // Logged-in user
            user: req.session.user,

            // Statistics
            stats: stats,

            // All user tickets
            tickets: tickets,

            // Recent tickets
            recentTickets: recentTickets,

            // Notifications
            notifications: notifications,

            // Current page
            currentPath: req.path
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        res.status(500).render("error", {
            title: "Dashboard Error",
            message: "Unable to load the dashboard."
        });
    }
};