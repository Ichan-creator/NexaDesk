function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/admin/login");
    }

    if (req.session.user.role !== "admin") {
        return res.status(403).render("error", {
            title: "Access Denied",
            message: "Administrator access is required."
        });
    }

    next();
}

module.exports = {
    requireAuth,
    requireAdmin
};