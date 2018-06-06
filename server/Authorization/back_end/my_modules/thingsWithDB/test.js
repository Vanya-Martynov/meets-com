let mysql = require('promise-mysql');

function test(req, res, next) {
    let cityId, schoolId;
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {

        conn.query(`SELECT cities_cityId, schools_schoolId FROM schoolFromCityId 
        JOIN schools ON (schools.schoolName = '${req.body.schoolName}' AND schools.schoolId = schoolFromCityId.schools_schoolId)
        JOIN cities ON (cities.cityName = '${req.body.cityName}' AND cities.cityId = schoolFromCityId.cities_cityId)`, function (err, result, fields) {
            console.log(result);
            cityId = result[0].cities_cityId;
            schoolId = result[0].schools_schoolId;
            console.log(cityId, schoolId);
        });

        return conn
    }).then(function (conn) {
        if(cityId && schoolId){
            conn.query(`DELETE FROM schoolFromCityId WHERE cities_cityId = ${cityId} AND schools_schoolId = ${schoolId}`, function (err,result,fields) {
                if(err) console.log(err);
            })
        }else console.log('fail');
    });
}
module.exports.test = test;