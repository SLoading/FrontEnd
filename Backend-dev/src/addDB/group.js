const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');

module.exports = function addGroup(container){
    return new Promise((resolve,reject)=>{
            let mass = []
            for (let i = 0;i < container.length;i++){
                let group = container[i]['group'];
                if (mass.indexOf(group) == -1){
                    mass.push(group);
                    const sqlInsert = `INSERT INTO sibgu.group (group_name) VALUES ('${group}')`;
                    const sqlSelect = `SELECT * FROM sibgu.group WHERE group_name = '${group}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{   
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);
                            
                        }
                    });
                }
            }
            resolve("Group added");
        }).catch(err=>{
            reject(err);
        });
}
