const express = require('express');
const users = express.Router();
const cors = require('cors');
const User = require('../models/user');
users.use(cors());

users.post('/api/login',(req,res)=>{
    const autoriz = req.body.user;
    User.findOne({
        where:{
            login : autoriz.login
        }
    })
    .then(user=>{
        if (user.password == autoriz.password){
            res.status(200).send();
        }
        else{
            res.status(500).send("500:Bad request");
        }
    })
    .catch(err=> {
        res.status(500).send("500:Bad request");
    });
});

module.exports = users;
