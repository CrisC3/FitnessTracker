const router = require("express").Router();

router.get("/exercise", (req, res) => {

    try
    {
        res.send("Hello /exercise");
    }
    catch (error)
    {
        res.send("Error: unable to fetch the request page");
    }

});

router.get("/stats", (req, res) => {

    try
    {
        res.send("Hello /stats");
    }
    catch (error)
    {
        res.send("Error: unable to fetch the request page");
    }

});

module.exports = router;