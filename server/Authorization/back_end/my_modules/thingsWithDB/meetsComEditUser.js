let mysql = require('promise-mysql');
let selectFromDB = 'id, login, password, name, email, birthday, country, city, school, role';

function meetsComEditUser(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function(conn){
        let result = conn.query(`UPDATE userEditMeetsCom SET
                    userName = '${req.body.userName}',               
                    userBiography = '${req.body.userBiography}',               
                    userInterests = '${JSON.stringify(req.body.userInterests)}',               
                    userLanguages = '${JSON.stringify(req.body.userLanguages)}',               
                    userHeight = '${req.body.userHeight}',               
                    userWeight = '${req.body.userWeight}',               
                    userBodyType = '${req.body.userBodyType}',               
                    userEyeColor = '${req.body.userEyeColor}',               
                    userHairColor = '${req.body.userHairColor}',               
                    userSmokingAttention = '${req.body.userSmokingAttention}',               
                    userDrinkingAttention = '${req.body.userDrinkingAttention}',               
                    userPhotos = '${JSON.stringify(req.body.userPhotos)}'
                    WHERE iduserEditMeetsCom = 1               
                 `,function (err,result,fields) {
            if(err){
                console.log(err);
            }
        });
        return conn
    }).then(function (conn) {
        conn.query(`SELECT * FROM userEditMeetsCom WHERE iduserEditMeetsCom = 1`, function (err, result, fields) {
            console.log(result);
            if(result[0].userInterests) result[0].userInterests = JSON.parse(result[0].userInterests);
            if(result[0].userLanguages) result[0].userLanguages = JSON.parse(result[0].userLanguages);
            if(result[0].userPhotos) result[0].userPhotos = JSON.parse(result[0].userPhotos);
            res.send(result);
        });
        conn.end();
        next();
    });
}

module.exports.meetsComEditUser = meetsComEditUser;