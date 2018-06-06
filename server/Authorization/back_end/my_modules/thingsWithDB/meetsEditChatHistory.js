let mysql = require('promise-mysql');

function editChatHistory(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`UPDATE chat_history SET 
        history = '${JSON.stringify(req.body.history)}' WHERE 
        firstUserHash = '${req.body.firstUserHash}' && secondUserHash = '${req.body.secondUserHash}'
        OR firstUserHash = '${req.body.secondUserHash}' && secondUserHash = '${req.body.firstUserHash}'` ,function (err,result,fields) {
            if(err){
                console.log(err);
            }
        });
        return conn;
    }).then(function (conn) {
        conn.query(`SELECT * FROM chat_history WHERE 
        firstUserHash = '${req.body.firstUserHash}' && secondUserHash = '${req.body.secondUserHash}'
        OR firstUserHash = '${req.body.secondUserHash}' && secondUserHash = '${req.body.firstUserHash}'`, function (err,result,fields) {
            result[result.length - 1].history = JSON.parse(result[result.length - 1].history);
            res.send(result[0].history);
        });
        conn.end();
    });
}

module.exports.editChatHistory = editChatHistory;