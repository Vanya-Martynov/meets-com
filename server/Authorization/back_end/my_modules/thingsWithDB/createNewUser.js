
let mysql = require('promise-mysql');
let selectFromDB = 'id, login, password, name, email, birthday, country, city, school, role';

function createNewUser(req, res, next){
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function(conn){
        let result = conn.query(`INSERT INTO userInfo 
                (
                    login,               
                    password,                
                    name,               
                    email,               
                    birthday,                
                    country,                
                    role,                
                    city,
                    school
                )
                 VALUES (
                    '${req.body.userLogin}',
                    '${req.body.userPassword}',
                    '${req.body.userName}',
                    '${req.body.userEmail}',
                    '${req.body.userBirthday}',
                    '${req.body.userCountry}',
                    '${req.body.userRole}',
                    '${req.body.userCity}',
                    '${req.body.userSchool}'
                 )`);
        return conn
    }).then(function (conn) {
        conn.query(`SELECT ${selectFromDB} FROM userInfo`, function (err, result, fields) {
            //console.log(result);
            res.send(result);
        });
        conn.end();
        next();
    });
}


module.exports.createNewUser = createNewUser;
