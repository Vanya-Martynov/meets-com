let mysql = require('promise-mysql');

function deleteUser(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {
        conn.query(`DELETE FROM userInfo WHERE id = ${req.body.id}`, function (err,result,fields) {
            //console.log(result);
            if(err){
                console.log(err);
            }
        });
        return conn;
    }).then(function (conn) {
        conn.query(`SELECT * FROM userInfo WHERE id = ${req.body.id}`, function (err,result,fields) {
            //console.log(result);
            res.send(result);
        });
        conn.end();
    });
}

module.exports.deleteUser = deleteUser;
