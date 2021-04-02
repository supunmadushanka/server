const express = require('express'); 
const bodyParser = require('body-parser');  
const cors = require('cors'); 
const sql = require('mssql');

var PORT = 3000;
const api = require('./routes/api');

const app = express(); 

app.use(bodyParser.json()); 

app.use(cors()); 

const sqlconfig={
    user:'sa',
    password:'123',
    server:'DESKTOP-1CHJNQH',
    database:'sms',
    port:1433,
    "options":{
        "encrypt":true,
        "enableArithAbort":true
    }
};

app.use('/api',api)

app.get('/',function(req,res){
    let connection = sql.connect(sqlconfig,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.send('db connected');
        }
    });
})

app.get('/parents',function(req,res){
    let connection = sql.connect(sqlconfig,(err)=>{
        if(err){
            console.log(err);
        }else{
            var request = new sql.Request();
            request.query('select * from Parent',function(er,recordset1){
                if(err)
                    console.log(er);
                else{
                    res.send(recordset1.recordset);
                }
            });
        }
    });
})

app.get('/players',function(req,res){
    let connection = sql.connect(sqlconfig,(err)=>{
        if(err){
            console.log(err);
        }else{
            var request = new sql.Request();
            request.query('select * from Player',function(er,recordset2){
                if(err)
                    console.log(er);
                else{
                    res.send(recordset2.recordset);
                }
            });
        }
    });
})

app.get('/teams',function(req,res){
    let connection = sql.connect(sqlconfig,(err)=>{
        if(err){
            console.log(err);
        }else{
            var request = new sql.Request();
            request.query('select * from Appuser',function(er,recordset3){
                if(err)
                    console.log(er);
                else{
                    res.send(recordset3.recordset);
                }
            });
        }
    });
})

app.get('/coaches',function(req,res){
    let connection = sql.connect(sqlconfig,(err)=>{
        if(err){
            console.log(err);
        }else{
            var request = new sql.Request();
            request.query('select * from Coach',function(er,recordset2){
                if(er)
                    console.log(er);
                else{
                    res.send(recordset2.recordset);
                }
            });
        }
    });
})




app.listen(PORT ,function(){
    console.log("Server running on localhost:"+ PORT);
});

app.post('/enroll',function(req,res){
    console.log(req.body);

    sql.connect(sqlconfig).then(pool => {
        
        return pool.request()
            .input('userEmail', sql.VarChar(30), req.body.userEmail)
            .input('userPassword', sql.VarChar(12), req.body.password)
            .execute('myproc')
    }).then(result => {
        console.dir(result)
    }).catch(err => {
        console.log(err);
    })
    
    res.status(200).send({"message": "Data received"});
})

app.post('/coachRegi',function(req,res){
    console.log(req.body);
    res.status(200).send({"message": "Data received"})
})

app.post('/parentRegi',function(req,res){
    console.log(req.body);
    res.status(200).send({"message": "Data received"})
})

app.post('/playereRegi1',function(req,res){
    console.log(req.body);
    res.status(200).send({"message": "Data received"})
})

app.post('/playereRegi2',function(req,res){
    console.log(req.body);
    res.status(200).send({"message": "Data received"})
})




