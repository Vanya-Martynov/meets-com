let express = require('express');
let app = express();
let port = 8010;
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();
let mysql = require('promise-mysql');
let crypto = require('crypto');
const nodemailer = require('nodemailer');



let http = require('http');
let WebSocket = require('ws');
let WebSocketRouter = require('web-socket-router');

//modules
let createNewUser = require('./my_modules/thingsWithDB/createNewUser');
let token = require('./my_modules/thingsWithDB/createExpiredToken');
let isUserExist = require('./my_modules/thingsWithDB/isUserExist');
let test = require('./my_modules/thingsWithDB/test');
let getCity = require('./my_modules/thingsWithDB/getCity');
let getSchool = require('./my_modules/thingsWithDB/getSchool');
let getCountries = require('./my_modules/thingsWithDB/getCountries');
//let getAllUsers = require('./my_modules/thingsWithDB/getAllUsers');
let editUser = require('./my_modules/thingsWithDB/editUser');
let deleteUser = require('./my_modules/thingsWithDB/deleteUser');
let getCurrentInfo = require('./my_modules/thingsWithDB/getInfoFromCurrentUser');
let guestReject = require('./my_modules/thingsWithDB/guestReject');
let roleControl = require('./my_modules/thingsWithDB/roleControl');
let getLastUser = require('./my_modules/thingsWithDB/getLastUser');
let deleteSchool = require('./my_modules/thingsWithDB/deleteSchool');
let deleteSchoolFromCity = require('./my_modules/thingsWithDB/deleteSchoolFromCity');
let meetsComEditUser = require('./my_modules/thingsWithDB/meetsComEditUser');
let meetsComGetUserData = require('./my_modules/thingsWithDB/meetsComGetUserData');
let createHistory = require('./my_modules/thingsWithDB/meetsCreateHistoryBetweenUsers');
let getChatHistory = require('./my_modules/thingsWithDB/meetsGetChatHistory');
let editChatHistory = require('./my_modules/thingsWithDB/meetsEditChatHistory');
let getAllUsers = require('./my_modules/thingsWithDB/meetsComGetAllUsers');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.post('/signUp', [/*isUserExist.isUserExist,*/ createNewUser.createNewUser /*token.createToken*/], function (req,res) {
    //res.send(req.body);
});

app.post('/getAllUsers', [getAllUsers.getAllUsers], function (req,res) {
    console.log(req.body);
});

app.post('/getCity', [getCity.getCity], function (req,res) {
    //res.send(req.body);
});

app.post('/getSchool', [getSchool.getSchool], function (req,res) {
    //res.send(req.body);
});

app.post('/getCountries', [getCountries.getCountries], function () {

});

app.post('/createNewUser', [createNewUser.createNewUser], function () {

});

app.post('/getLastUser', [getLastUser.getLastUser], function () {

});

app.post('/deleteUser', [guestReject.guestReject, deleteUser.deleteUser], function () {

});

app.post('/editUser', [guestReject.guestReject, roleControl.controlUser, editUser.editUser], function (req,res) {
    console.log(req.body);
});

app.post('/getInfoFromCurrentUser', [roleControl.controlGuest, getCurrentInfo.getCurrentInfo], function (req,res) {
    console.log(req.body);
});
app.post('/deleteSchool', [deleteSchool.deleteSchool], function (req,res) {
    res.send({MESSAGE: 'DONE'});
})

app.post('/deleteSchoolFromCity', [deleteSchoolFromCity.deleteSchoolFromCity], function (req,res) {
    res.send({MESSAGE: 'DONE'});
})












const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server: server , path: "/my"});
const webSocketRouterInstance = new WebSocketRouter(wss);



app.get('/getAllUsers', [getAllUsers.getAllUsers], function (req,res) {

});

app.post('/editProfile',[meetsComEditUser.meetsComEditUser], function(req, res){
    console.log('edit');

});

app.post('/getUserData',[meetsComGetUserData.meetsComGetUserData], function(req, res){

});

app.post('/editChatHistory',[editChatHistory.editChatHistory], function(req, res){

});

app.post('/getChatHistory', [getChatHistory.getChatHistory], function (req, res) {
});

function createMessage(content, isBroadcast = false, sender = 'NS') {
    return JSON.stringify(
        {
            content,
            isBroadcast,
            sender
        }
    );
}

let count = 0;
wss.on('connection', (ws) => {

    const extWs = ws;

    extWs.isAlive = true;

    ws.on('pong', () => {
        extWs.isAlive = true;
    });

    //connection is up, let's add a simple simple event
    ws.on('message', (msg) => {

        const message = JSON.parse(msg);
        extWs.id = message.sender;
        console.log(ws.id, 'WS ID');

            if (message.isBroadcast) {

                //send back the message to the other clients
                wss.clients
                    .forEach(client => {
                        if(client.id === message.sendToId){
                            client.send(createMessage(message.content, true, message.sender));
                        }
                    });

            }

            //ws.send(createMessage(`You sent -> ${message.content}`, message.isBroadcast));

    });

    //send immediatly a feedback to the incoming connection
    //ws.send(createMessage('Hi there, I am a WebSocket server'));

    ws.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    })
});

setInterval(() => {
    wss.clients.forEach((ws) => {

        const extWs = ws;

        if (!extWs.isAlive) return ws.terminate();

        extWs.isAlive = false;
        ws.ping(null, undefined);
    });

}, 10000);

/*
wss.on('connection', ws => {
    let id = crypto.randomBytes(20).toString('hex');
    ws.id = id;

    //connection is up, let's add a simple simple event
    ws.on('message', message => {
        const broadcastRegex = /^[1-9]/;
        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');
            let count = 0;
            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    count++;
                    if (client !== ws) {
                        client.send({message: `Hello, you sent -> ${message}`});
                    }
                });
            console.log(count);
        } else {
            ws.send({message: `Hello, you sent -> ${message}`});
        }
    });

    //send immediatly a feedback to the incoming connection
    ws.send({message: `Hello, you sent -> ${message}`});
});

*/








app.post('/createHistoryBetweenUsers', [createHistory.createHistory], function (req, res) {
    console.log(2);
});




// for New Project


app.post('/generateHashLink', function (req,res) {
console.log(req.body);

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let id = crypto.randomBytes(20).toString('hex');
        console.log(id);
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <150519751977@mail.com>', // sender address
            to: '150519751977@mail.ru', // list of receivers
            subject: `http://localhost:4200/email-link?key=${id}`, // Subject line
            text: `http://localhost:4200/email_verification?key=${id}`, // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
    res.send({MESSAGE: 'DONE'});
});

app.post('/createSomeUser', function (req, res) {
    console.log(req.body);
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123123123',
        database: 'data_base_server'
    }).then(function(conn){
        conn.query(`INSERT INTO myOwnUser 
                (
                    userHash,               
                    userEpiredToken
                )
                 VALUES (
                    '${req.body.hash}',
                    '${req.body.time}'
                 )`);
        return conn
    }).then(function (conn) {
        conn.query(`SELECT * FROM myOwnUser`, function (err, result, fields) {
            console.log(result);
            if(err){
                console.log(err);
            }
        });
        conn.end()
    });

});


app.listen(3001, () => console.log('App listening on port 3001'));
server.listen(port, () => console.log('Example server listening on port: ' + port));