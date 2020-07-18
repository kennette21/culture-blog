var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.json(getRandomPiece());
});

function getRandomPiece() {
    return {"content": "random", "link": "www.google.com"};
    // eventually this function will go to mysql and get a random peice
}

module.exports = router;