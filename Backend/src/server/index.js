const express = require('express');
app = express();
const passport   = require('passport');
const session    = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const add = require('../addDB/addInDB');
const valueParser = require('../parser/valueParser');


const port = 3030;
const hostname = '127.0.0.1';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post('/api/addValueInDB',(req,res)=>{
    valueParser()
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        res.send(err);
    });
});


let mtest;

const Schedule = require('../routes/schedule');
app.use("/",Schedule);





const User = require('../routes/users');
app.use("/",User);





app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});



