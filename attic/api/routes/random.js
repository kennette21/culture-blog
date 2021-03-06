var express = require("express");
var router = express.Router();
const connection = require('../helpers/connection'); //todo: I do not like having these abstractions in helpers, we should figure out how to do it without the helpers
const query = require('../helpers/query');

router.get("/", async function(req, res, next) {
    const dbConfig = {
        host: 'localhost',
        user: 'cb_user',
        password: 'password',
        database: 'culture_blog_db'
    };
    const conn = await connection(dbConfig).catch(e => {});
    const results = await query(conn, 'SELECT *  FROM pieces ORDER BY RAND() LIMIT 1;').catch(console.log); // todo: extract the random fetching into its own function
    const response = {"piece": results[0]};
    res.json(response);
});

module.exports = router;