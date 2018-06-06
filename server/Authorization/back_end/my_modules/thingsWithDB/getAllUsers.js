let mysql = require('promise-mysql');

function getAllUsers(req, res, next) {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT * FROM userInfo` ,function (err,result,fields) {
            //console.log(result);
            if(err) console.log(err);
            //console.log(result);
            res.send(result);
        });
        conn.end();

    });
}

module.exports.getAllUsers = getAllUsers;