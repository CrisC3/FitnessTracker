const router = require("express").Router();
const path = require("path");

router.get("/exercise", (req, res) => {

    try
    {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    }
    catch (error)
    {
        res.send("Error: unable to fetch the request page");
    }

});

router.get("/stats", (req, res) => {

    try
    {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    }
    catch (error)
    {
        res.send("Error: unable to fetch the request page");
    }

});

module.exports = router;