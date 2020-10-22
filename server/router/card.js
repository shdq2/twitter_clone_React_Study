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
    
    var stmt = 'select * from card order by card_date desc';
    connection.query(stmt, function (err, result) {
        resultJson.id = data.id;       
         
        resultJson.err = err;
        for(var i = 0 ; i < result.length;i++){
            result[i].card_img = Buffer.alloc(result[i].card_img.length,result[i].card_img,'base64').toString('utf-8');
        };
        resultJson.result = result;
        
        res.json(resultJson);
    })
})

router.post('/cardInsert',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    

    var data = req.body;    
    var resultJson = {};    
    
    var stmt = 'insert into card(card_msg,card_img,user_id,card_date) values(\''+data.msg+'\',\''+data.img+'\',\''+data.user_id+'\',now())';
    connection.query(stmt, function (err, result) {

        resultJson.id = data.id;       
        resultJson.result = result; 
        resultJson.err = err;      
        
        res.json(resultJson);
    })
})

router.post('/cardDelete',function(req,res){
    if(connection == null){
        connection = mysql_dbc.get();
    }    

    var data = req.body;    
    var resultJson = {};    
    var stmt = 'delete from card where card_id = \''+data.id+'\'';
    connection.query(stmt, function (err, result) {

        resultJson.id = data.id;       
        resultJson.result = result; 
        resultJson.err = err;      
        
        res.json(resultJson);
    })
})
module.exports = router;