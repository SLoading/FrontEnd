const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');


module.exports = function addTime(container){
    return new Promise((resolve,reject)=>{
            let mass = []
            for (let i = 0;i < container.length;i++){
                let timeBeg = container[i]['timeBeg'];
                let timeEnd = container[i]['timeEnd'];
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
}

