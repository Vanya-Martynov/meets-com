
let mysql = require('promise-mysql');
let selectFromDB = 'id, login, password, name, email, birthday, country, city, school';

let currentTime = Date.now();
let timeOfLive = 1000;
currentTime += timeOfLive;

function createToken(req, res, next) {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123123123',
            database: 'data_base_server'
        }).then(function(conn){
            let result = conn.query(`INSERT INTO expiredToken (expiredTime, userId) VALUES (${currentTime}, 1)`);
            return conn
        }).then(function (conn) {
            conn.query(`SELECT * FROM expiredToken`, function (err, result, fields) {
                //console.log(result);
            });
            conn.end();
            next();
        });
}

function isExpiredToken(token, req, res, next) {
    if(Date.now() > token){
        res.send({ERROR: 'TOKEN_EXPIRED'})
    }else next();
}

module.exports.isExpiredToken = isExpiredToken;
module.exports.createToken = createToken;