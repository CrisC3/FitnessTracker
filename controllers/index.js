// Calls to packages/routes
const router = require("express").Router();
const models = require("../models");

// const apiRoutes = require("./api");
const webRoutes = require("./webRoutes");

// Setup routes to use
router.use("/", webRoutes);
// router.use("/api", apiRoutes);

// Redirects the user if it does not
// match an existing route back to homepage
router.use((req, res) => {
    res.redirect("/");
});

module.exports = router;