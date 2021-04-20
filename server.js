const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
var PORT = process.env.PORT || 3000
const api = require('./routes/api');
const app = express();
app.use(bodyParser.json());
app.use(cors());


const sqlconfig = {
    user: 'sa',
    password: '123',
    server: 'DESKTOP-1CHJNQH',
    database: 'sms',
    port: 1433,
    "options": {
        "encrypt": true,
        "enableArithAbort": true
    }
};

app.use('/api', api)

app.get('/', function(req, res) {
    let connection = sql.connect(sqlconfig, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('db connected');
        }
    });
})

app.listen(PORT, function() {
    console.log("Server running on localhost:" + PORT);
});