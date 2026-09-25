require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const pageRoutes = require("./routes/pageRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "nexadesk-development-secret",

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 8,
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;

  next();
});

/*
|--------------------------------------------------------------------------
| HOME
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  return res.redirect("/login");
});

// ===============================
// ROUTES
// ===============================

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.use("/tickets", ticketRoutes);

// ADMIN ROUTES MUST COME BEFORE
// PROTECTED PAGE ROUTES
app.use("/admin", adminRoutes);

app.use("/", pageRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    message:
      "The page you are looking for does not exist."
  });
});

/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).render("error", {
    title: "Server Error",
    message:
      "Something went wrong. Please try again."
  });
});

/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(
    `NexaDesk running at http://localhost:${PORT}`
  );
});