let mysql = require('promise-mysql');


function deleteSchool(req, res, next){
    console.log(req.method);
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`SELECT * FROM schools WHERE schoolName = '${req.body.schoolName}'`, function (err,result,fields) {
            console.log(result);
            if(err){
                console.log(err);
            }
            console.log(req.body)
        });
        return conn;
    }).then(function (conn) {
        conn.query(`DELETE FROM schools WHERE schoolName = '${req.body.schoolName}'`, function (err,result,fields) {
            //console.log(result);
            if(err){
                console.log(err);
            }
        });
        return conn;
    }).then(function (conn) {
        conn.query(`SELECT * FROM schools WHERE schoolName = '${req.body.schoolName}'`, function (err,result,fields) {
            if(err){
                console.log(err);
            }
            console.log(result);
            //res.send(result);
            next()
        });
        conn.end();
    });
}

module.exports.deleteSchool = deleteSchool;
