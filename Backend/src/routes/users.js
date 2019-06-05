const express = require('express');
const users = express.Router();
const cors = require('cors');
const User = require('../models/user');
users.use(cors());

users.post('/api/login',(req,res)=>{
    console.log(req.body.user)
    const authoriz = req.body.user
    User.findOne({
        where:{
            login : authoriz.login
        }
    })
    .then(user=>{
        if (user.password == authoriz.password){
            res.send("good");
        }
        else{
            res.Redirect("/error");
        }
    })
    .catch(err=> {
        res.Redirect(err);
    });
});

module.exports = users;
