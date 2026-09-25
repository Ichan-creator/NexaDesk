const bcrypt = require("bcryptjs");
const db = require("../config/db");

/*
=========================================
KNOWLEDGE BASE
=========================================
*/

exports.knowledgeBase = async (req, res) => {
  try {
    const [articles] = await db.execute(
      `SELECT *
       FROM knowledge_articles
       WHERE published = 1
       ORDER BY created_at DESC`
    );

    res.render("knowledge-base", {
      title: "Knowledge Base",
      articles
    });

  } catch (error) {

    console.error("Knowledge Base Error:", error);

    res.status(500).render("error", {
      title: "Knowledge Base Error",
      message: "Unable to load knowledge base."
    });
  }
};


/*
=========================================
PROFILE
=========================================
*/

exports.profile = async (req, res) => {
  try {

    const userId = req.session.user.id;

    const [rows] = await db.execute(
      `SELECT
        id,
        full_name,
        email,
        department,
        role,
        status,
        created_at
       FROM users
       WHERE id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      return res.redirect("/login");
    }

    res.render("profile", {
      title: "My Profile",
      profile: rows[0]
    });

  } catch (error) {

    console.error("Profile Error:", error);

    res.status(500).render("error", {
      title: "Profile Error",
      message: "Unable to load your profile."
    });
  }
};


/*
=========================================
UPDATE PROFILE
=========================================
*/

exports.updateProfile = async (req, res) => {
  try {

    const userId = req.session.user.id;

    const {
      full_name,
      department
    } = req.body;

    if (!full_name || !department) {

      req.session.error =
        "Name and department are required.";

      return res.redirect("/profile");
    }

    await db.execute(
      `UPDATE users
       SET full_name = ?,
           department = ?
       WHERE id = ?`,
      [
        full_name,
        department,
        userId
      ]
    );

    req.session.user.fullName =
      full_name;

    req.session.user.department =
      department;

    req.session.success =
      "Profile updated successfully.";

    res.redirect("/profile");

  } catch (error) {

    console.error("Update Profile Error:", error);

    req.session.error =
      "Unable to update profile.";

    res.redirect("/profile");
  }
};


/*
=========================================
CHANGE PASSWORD
=========================================
*/

exports.changePassword = async (req, res) => {
  try {

    const userId = req.session.user.id;

    const {
      current_password,
      new_password,
      confirm_password
    } = req.body;


    if (
      !current_password ||
      !new_password ||
      !confirm_password
    ) {

      req.session.error =
        "Please complete all password fields.";

      return res.redirect("/profile");
    }


    if (new_password.length < 6) {

      req.session.error =
        "New password must contain at least 6 characters.";

      return res.redirect("/profile");
    }


    if (new_password !== confirm_password) {

      req.session.error =
        "New passwords do not match.";

      return res.redirect("/profile");
    }


    const [rows] = await db.execute(
      `SELECT password_hash
       FROM users
       WHERE id = ?`,
      [userId]
    );


    if (rows.length === 0) {
      return res.redirect("/login");
    }


    const valid = await bcrypt.compare(
      current_password,
      rows[0].password_hash
    );


    if (!valid) {

      req.session.error =
        "Current password is incorrect.";

      return res.redirect("/profile");
    }


    const hash =
      await bcrypt.hash(
        new_password,
        10
      );


    await db.execute(
      `UPDATE users
       SET password_hash = ?
       WHERE id = ?`,
      [
        hash,
        userId
      ]
    );


    req.session.success =
      "Password changed successfully.";

    res.redirect("/profile");

  } catch (error) {

    console.error("Change Password Error:", error);

    req.session.error =
      "Unable to change password.";

    res.redirect("/profile");
  }
};


// NOTIFICATIONS
exports.notifications = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const [notifications] = await db.execute(
      `SELECT
        id,
        user_id,
        title,
        message,
        type,
        is_read,
        created_at
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    const unreadCount = notifications.filter(
      notification => Number(notification.is_read) === 0
    ).length;

    res.render("notifications", {
      title: "Notifications",
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error("Notifications Error:", error);

    res.status(500).render("error", {
      title: "Notifications Error",
      message: "Unable to load notifications."
    });
  }
};

// MARK NOTIFICATION AS READ
exports.markNotificationRead = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const notificationId = req.params.id;

    await db.execute(
      `UPDATE notifications
       SET is_read = 1
       WHERE id = ?
       AND user_id = ?`,
      [notificationId, userId]
    );

    return res.redirect("/notifications");
  } catch (error) {
    console.error(
      "Mark Notification Read Error:",
      error
    );

    return res.redirect("/notifications");
  }
};