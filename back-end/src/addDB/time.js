const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');


module.exports = function addTime(groupName){
    return new Promise((resolve,reject)=>{
        parser(groupName).then(pars=>{
            let mass = []
            for (let i = 0;i < pars.length;i++){
                let timeBeg = pars[i]['timeBeg'];
                let timeEnd = pars[i]['timeEnd'];
                if (mass.indexOf(timeEnd) == -1 && mass.indexOf(timeBeg) == -1){
                    mass.push(timeBeg);
                    mass.push(timeEnd);
                    const sqlInsert = `INSERT INTO time (timeBeg,timeEnd) VALUES ('${timeBeg}','${timeEnd}')`;
                    const sqlSelect = `SELECT * FROM time WHERE timeBeg = '${timeBeg}' and timeEnd = '${timeEnd}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);

                        }
                    });
                }
            }
            resolve("Time added");
        }).catch(err=>{
            console.log(err);
        });
    });
}
