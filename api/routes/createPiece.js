var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {  
    const connection = require('../helpers/connection'); //todo: I do not like having these abstractions in helpers, we should figure out how to do it without the helpers
    const query = require('../helpers/query');

    pieceData = req.body;
    const dbConfig = {
        host: 'localhost',
        user: 'cb_user',
        password: 'password',
        database: 'culture_blog_db'
    };
    const conn = await connection(dbConfig).catch(e => {});
    console.log("trying to add this piece to the db, body is: ", req.body);
    const sql = "INSERT INTO `pieces` (`title`, `link`, `why`, `category`) VALUES (?, ?, ?, ?);";
    const params = [req.body.name, req.body.link, req.body.why, req.body.category]

    const results = await query(conn, sql, params).catch(console.log);
    res.json({results}) // todo: maybe it is not cool to return what the db returned for the insert...
});

module.exports = router;