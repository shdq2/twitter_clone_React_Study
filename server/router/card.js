var express = require('express');
var router = express.Router();
var mysql_dbc = require('./../database/db')();
var connection = mysql_dbc.get();

router.get('/cardList',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    

    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'select * from card';
    connection.query(stmt, function (err, result) {
        resultJson.id = data.id;       
        resultJson.result = result; 
        resultJson.err = err;      
        
        res.json(resultJson);
    })
})

router.post('/cardInsert',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    

    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'insert into card(card_msg,card_img,user_id) values(\''+data.msg+'\',\''+data.img+'\',\''+data.user_id+'\')';
    connection.query(stmt, function (err, result) {

        resultJson.id = data.id;       
        resultJson.result = result; 
        resultJson.err = err;      
        
        res.json(resultJson);
    })
})
module.exports = router;