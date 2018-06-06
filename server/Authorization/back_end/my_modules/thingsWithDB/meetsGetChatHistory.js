let mysql = require('promise-mysql');
let selectFromDB = 'id, login, password, name, email, birthday, country, city, school, role';

function getChatHistory(req, res, next){

    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT * FROM chat_history WHERE 
        firstUserHash = '${req.body.firstUserHash}' && secondUserHash = '${req.body.secondUserHash}'
        OR firstUserHash = '${req.body.secondUserHash}' && secondUserHash = '${req.body.firstUserHash}'
         `, function (err, result, fields) {
            if (err) console.log(err);
            res.send(result[0].history);
        });
        conn.end();
        next();
    });
}


module.exports.getChatHistory = getChatHistory;