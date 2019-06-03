const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');



module.exports = function addTeacher(groupName){
    return new Promise((resolve,reject)=>{
        parser(groupName).then(pars=>{
            let mass = []
            for (let i = 0;i < pars.length;i++){
                let dayofweek = pars[i]['weekday'];
                if (mass.indexOf(dayofweek) == -1){
                    mass.push(dayofweek);
                    const sqlInsert = `INSERT INTO weekday (weekday_name) VALUES ('${dayofweek}')`;
                    const sqlSelect = `SELECT * FROM weekday WHERE weekday_name = '${dayofweek}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);

                        }
                    });
                }
            }
            resolve("Weekday added");
        }).catch(err=>{
            reject(err);
        });
    });
}
