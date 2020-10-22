var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const user = require('./router/user');
const card = require('./router/card');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ limit:"50mb",extended:false }));
app.use(express.static(path.join(__dirname,'../build')));

app.use('/user',user);
app.use('/card',card);
//app.use('/activity',activity);

const mysql = require('./database/db')();
var connection = mysql.init();
mysql.test_open(connection);

const port = process.env.PORT || 4000;
app.set('port' , port );
 const server = http.createServer(app);
 server.listen(port, () =>{
      console.log(`Running on localhost:${port}`)

});

const socket = require('socket.io');
const io = socket.listen(server);

io.on('connection',(sock)=>{
    console.log("Login User" + sock.client.id);
    sock.on('cardUpdate', (id)=>{
        io.emit('cardUpdate',id);
    })
})