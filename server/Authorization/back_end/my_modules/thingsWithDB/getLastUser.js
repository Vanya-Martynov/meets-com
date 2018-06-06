let mysql = require('promise-mysql');
let selectFromDB = 'id, login, password, name, email, birthday, country, city, school, role';


function getLastUser(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT * FROM userInfo ORDER BY id DESC LIMIT 1;`, function (err, result, fields) {
            console.log(result);
            res.send(result);
        });
        conn.end();
        next();
    });
}

module.exports.getLastUser = getLastUser;