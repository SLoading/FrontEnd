const express = require('express');
const classroom = express.Router();
const cors = require('cors');
classroom.use(cors());
const parser = require('../parser/valueParser');
const db = require('../database/connection');

module.exports = function addClassroom(groupName){
    return new Promise((resolve,reject)=>{
        parser(groupName).then(pars=>{
            let mass = []
            for (let i = 0;i < pars.length;i++){
                let classroom = pars[i]['classroom'];

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
    });
};
