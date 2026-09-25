const bcrypt = require("bcryptjs");
const pool = require("../config/db");

exports.showLogin = (req, res) => {
  res.render("login", {
    title: "Login"
  });
};

exports.showRegister = (req, res) => {
  res.render("register", {
    title: "Create Account"
  });
};

exports.register = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      department
    } = req.body;

    if (!full_name || !email || !password || !department) {
      req.session.error = "Please complete all required fields.";
      return res.redirect("/register");
    }

    if (password.length < 8) {
      req.session.error = "Password must be at least 8 characters.";
      return res.redirect("/register");
    }

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      req.session.error = "An account with that email already exists.";
      return res.redirect("/register");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users
       (full_name, email, password_hash, department, role, status)
       VALUES (?, ?, ?, ?, 'user', 'active')`,
      [
        full_name,
        email,
        passwordHash,
        department
      ]
    );

    req.session.success = "Account created successfully. You can now log in.";
    res.redirect("/login");

  } catch (error) {
    console.error("Registration error:", error);

    req.session.error = "Unable to create your account.";
    res.redirect("/register");
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      req.session.error = "Please enter your email and password.";
      return res.redirect("/login");
    }

    const [users] = await pool.query(
      `SELECT *
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email]
    );

    if (users.length === 0) {
      req.session.error = "Invalid email or password.";
      return res.redirect("/login");
    }

    const user = users[0];

    if (user.status !== "active") {
      req.session.error = "Your account is inactive.";
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      req.session.error = "Invalid email or password.";
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      department: user.department,
      role: user.role
    };

    res.redirect("/dashboard");

  } catch (error) {
    console.error("Login error:", error);

    req.session.error = "Unable to log in. Please try again.";
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);
      return res.redirect("/dashboard");
    }

    res.redirect("/login");
  });
};