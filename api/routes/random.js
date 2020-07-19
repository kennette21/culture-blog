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
    const response = {"content": results[0].content, "link": results[0].link};
    res.json(response);
});

// the raw way that did not work because of asyncronous shit:
// connection.query('SELECT *  FROM pieces ORDER BY RAND() LIMIT 1;', function (err, rows, fields) {
    //     if (err) throw err
      
    //     console.log('The row is: ', rows[0])
    //     console.log(rows[0].content);
    //     content = rows[0].content;
    //     link = rows[0].link;
        
    //     return {"content": content, "link": link};
    // });

module.exports = router;