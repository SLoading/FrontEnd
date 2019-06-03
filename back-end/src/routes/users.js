const express = require('express');
const users = express.Router();
const cors = require('cors');
const User = require('../models/user');
users.use(cors());

users.post('/api/login',(req,res)=>{
    return new Promise((resolve,reject)=>{
      const human = req.body.user;
      User.findOne({
          where:{
              login : human.login
          }
      })
      .then(user=>{
          if (user.password == human.password){
            res.end('REQ');
              console.log("Welcome");
              resolve("Good");
          }
          else{
              reject("ERR");
          }
      })
      .catch(err=> {
          reject("ERR");
      });
    })

});

module.exports = users;
