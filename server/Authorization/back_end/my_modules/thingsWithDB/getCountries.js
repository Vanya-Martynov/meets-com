let mysql = require('promise-mysql');

function getCountries(req, res, next) {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT countryName FROM countries` ,function (err,result,fields) {
            //console.log(result);
            res.send(result);
        });
        conn.end();

    });
}
module.exports.getCountries = getCountries;