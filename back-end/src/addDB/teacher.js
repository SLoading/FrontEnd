const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/valueParser');
const db = require('../database/connection');


module.exports = function addTeacher(groupName){
    return new Promise((resolve,reject)=>{
        parser(groupName).then(pars=>{
            let mass = []
            for (let i = 0;i < pars.length;i++){
                let teacher = pars[i]['teacher'];
                if (mass.indexOf(teacher) == -1){
                    mass.push(teacher);
                    const sqlInsert = `INSERT INTO teacher (FIO) VALUES ('${teacher}')`;
                    const sqlSelect = `SELECT * FROM teacher WHERE FIO = '${teacher}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);

                        }
                    });
                }
            }
            resolve("Teacher added");
        }).catch(err=>{
            console.log(err);
        });
    });
}
