const db = require("../config/db");

exports.list = async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Get user's notifications
    const [notifications] = await db.execute(
      `
      SELECT
        id,
        user_id,
        title,
        message,
        type,
        is_read,
        created_at
      FROM notifications
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 50
      `,
      [userId]
    );

    // Get unread notification count
    const [unreadRows] = await db.execute(
      `
      SELECT COUNT(*) AS unreadCount
      FROM notifications
      WHERE user_id = ?
      AND is_read = 0
      `,
      [userId]
    );

    const unreadCount = unreadRows[0].unreadCount;

    res.render("notifications", {
      title: "Notifications",
      notifications,
      unreadCount
    });

  } catch (error) {
    console.error("Notification list error:", error);

    res.status(500).render("error", {
      title: "Notifications Error",
      message: "Unable to load notifications."
    });
  }
};


exports.markAsRead = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const notificationId = req.params.id;

    await db.execute(
      `
      UPDATE notifications
      SET is_read = 1
      WHERE id = ?
      AND user_id = ?
      `,
      [
        notificationId,
        userId
      ]
    );

    return res.redirect("/notifications");

  } catch (error) {
    console.error("Mark notification as read error:", error);

    req.session.error =
      "Unable to update the notification.";

    return res.redirect("/notifications");
  }
};


exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.session.user.id;

    await db.execute(
      `
      UPDATE notifications
      SET is_read = 1
      WHERE user_id = ?
      AND is_read = 0
      `,
      [userId]
    );

    return res.redirect("/notifications");

  } catch (error) {
    console.error("Mark all notifications as read error:", error);

    req.session.error =
      "Unable to update notifications.";

    return res.redirect("/notifications");
  }
};