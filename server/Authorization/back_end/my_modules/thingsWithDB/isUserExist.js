let mysql = require('promise-mysql');

function isUserExist(req, res, next) {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT login FROM userInfo`, function (err, result, fields) {
            let isExist = null;

            for(let i = 0; i < result.length; i++){
                if(req.body.userLogin === result[i]._login){
                    isExist = true;
                }

            }
            if(!isExist){
                next();
            }else{
                res.send({ERROR: 'USER_IS_ALREADY_EXIST'});
            }

        });
        conn.end();

    });
}

module.exports.isUserExist = isUserExist;