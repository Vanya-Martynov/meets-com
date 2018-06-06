let mysql = require('promise-mysql');

function meetsComGetUserData(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT * FROM userEditMeetsCom WHERE userHash = ${req.body.userHash}`, function (err,result,fields) {
            if(result[0].userInterests) result[0].userInterests = JSON.parse(result[0].userInterests);
            if(result[0].userLanguages) result[0].userLanguages = JSON.parse(result[0].userLanguages);
            if(result[0].userPhotos) result[0].userPhotos = JSON.parse(result[0].userPhotos);
            res.send(result[0]);
        });
        conn.end();
    });
}

module.exports.meetsComGetUserData = meetsComGetUserData;