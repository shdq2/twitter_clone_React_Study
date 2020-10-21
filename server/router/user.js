var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

router.post('/login',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    

    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'select id from user where id=\''+data.id+'\' and pw = \''+data.pw+'\'';
    connection.query(stmt, function (err, result) {

        resultJson.id = data.id;       
        resultJson.result = result; 
        resultJson.err = err;      
        
        res.json(resultJson);
    })
})

router.post('/createAccount',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    

    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'insert into user values(\''+data.id+'\',\''+data.pw+'\')';
    connection.query(stmt, function (err, result) {
           
        resultJson.id = data.id;       
        resultJson.result = result; 
        resultJson.err = err;      
        
        res.json(resultJson);
    })
})
module.exports = router;