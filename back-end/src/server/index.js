const express = require('express');
app = express();
const passport   = require('passport');
const session    = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const add = require('../addDB/addInDB');
const valueParser = require('../parser/valueParser');


const port = 3030;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/api/test',(req,res)=>{
  console.log("TEST");
  res.redirect("/test");
});


app.post('/api/parsValue',(req,res)=>{
    let groupName = req.body.groupName;
    let group;
    valueParser(groupName).then(result=>{
        group = result;
        add(groupName)
        res.send('Added group');
    });
    // const parser = require('../parser/parser');
    // parser
    // .then(result=>{
    //     console.log("End");
    //     add();
    // })
    // .catch(err=>{
    //     console.log(err);
    // });
});


let mtest;

const Schedule = require('../routes/schedule');
app.use("/",Schedule);





const User = require('../routes/users');
app.use("/",User);

app.get("/api/addDB",(req,res)=>{
    res.send("End");
});



app.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
});
