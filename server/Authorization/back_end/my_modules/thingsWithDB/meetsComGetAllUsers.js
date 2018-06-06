let mysql = require('promise-mysql');
let selectFromDB = 'id, login, password, name, email, birthday, country, city, school, role';

function getAllUsers(req, res, next){

    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT * FROM userEditMeetsCom`, function (err, result, fields) {
            if (err) console.log(err);
            res.send(result);
        });
        conn.end();
        next();
    });
}


module.exports.getAllUsers = getAllUsers;