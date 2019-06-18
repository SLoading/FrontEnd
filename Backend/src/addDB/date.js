const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');
let mass = []


module.exports = function addDate(container){
    return new Promise((resolve,reject)=>{
            for (let i = 0;i < container.length;i++){
                let date = container[i]['date'];
                if (mass.indexOf(date) == -1 && date != undefined){
                    mass.push(date);
                    const sqlInsert = `INSERT INTO date (date) VALUES ('${date}')`;
                    const sqlSelect = `SELECT * FROM date WHERE date = '${date}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{   
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);
                            
                        }
                    });
                }
            }
            resolve("Date added");
        }).catch(err=>{
            console.log(err);
        });
}
