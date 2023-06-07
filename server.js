const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const path = require('path');
app.use(express.static(path.join(__dirname,'public')));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
})

connection.connect();

//kérésre elküldi az összes tagot
app.get("/tagok", function (req, res){
    let sql = "SELECT * FROM ugyfel";
    connection.query(sql, function (err,rows)
    {
        if(err){
            console.log(err);
        }
        else {
            res.send(rows);
        }
    })
})

app.post("/befiz", function (req, res) {

    let values = [req.body.tagdij, req.body.osszeg];
    connection.query("INSERT INTO befiz (azon,osszeg) VALUES (?,?)", values, function(err,result,fields){

    if(err){
        console.log(err);
    }
    else res.send(rows);
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});