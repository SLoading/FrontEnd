const express = require('express');
const classroom = express.Router();
const cors = require('cors');
classroom.use(cors());
const db = require('../database/connection');

module.exports = function addClassroom(container){
    return new Promise((resolve,reject)=>{
            let mass = []
            for (let i = 0;i < container.length;i++){
                let classroom = container[i]['classroom'];
                if (mass.indexOf(classroom) == -1){
                    mass.push(classroom);
                    const sqlInsert = `INSERT INTO classroom (classroom) VALUES ('${classroom}')`;
                    const sqlSelect = `SELECT * FROM classroom WHERE classroom = '${classroom}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{ 
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);
                            
                        }
                    });
                }
            }
            resolve("Classroom added");
        }).catch(err=>{
            reject(err);
        });
};


