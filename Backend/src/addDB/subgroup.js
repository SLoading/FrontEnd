const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');



module.exports = function addSubgroup(container){
    return new Promise((resolve,reject)=>{
            let mass = []
            for (let i = 0;i < container.length;i++){
                let subgroup = container[i]['subgroup'];
                if (mass.indexOf(subgroup) == -1){
                    mass.push(subgroup);
                    const sqlInsert = `INSERT INTO subgroup (subgroup) VALUES ('${subgroup}')`;
                    const sqlSelect = `SELECT * FROM subgroup WHERE subgroup = '${subgroup}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);
                            
                        }
                    });
                }
            }
            resolve("Subgroup added");
        }).catch(err=>{
            reject(err);
        });
}

