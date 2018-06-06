let mysql = require('promise-mysql');

function getSchool(req, res, next) {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT schoolName FROM schools JOIN schoolFromCityId WHERE (cities_cityId = '${req.body.userCityId}' AND schools_schoolId = schoolId)` ,function (err,result,fields) {
            res.send(result);
        });
        conn.end();

    });
}
module.exports.getSchool = getSchool;