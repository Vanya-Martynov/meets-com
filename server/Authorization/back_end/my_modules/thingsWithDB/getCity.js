let mysql = require('promise-mysql');

function getCity(req, res, next) {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT cityName, cityId FROM countries JOIN cities WHERE (countryId = countries_countryId AND countryName = '${req.body.userCountry}')`, function (err, result, fields) {
            //console.log(result, req.body.userCountry);
            if(err){
                console.log(err);
            }
            res.send(result);
        });
        conn.end();

    });
}
module.exports.getCity = getCity;