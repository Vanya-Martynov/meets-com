let mysql = require('promise-mysql');

function editUser(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function (conn) {


        conn.query(`UPDATE userInfo SET 
        login = '${req.body.userLogin}',
        password = '${req.body.userPassword}',
        email = '${req.body.userEmail}',
        birthday = '${req.body.userBirthday}',
        name = '${req.body.userName}'
        WHERE id = ${req.body.id}` ,function (err,result,fields) {
            if(err){
                console.log(err);
            }
        });
        return conn;
    }).then(function (conn) {
        conn.query(`SELECT * FROM userInfo WHERE id = ${req.body.id}`, function (qew,result,qews) {
            res.send(result);
        });
        conn.end();
    });
}

module.exports.editUser = editUser;




