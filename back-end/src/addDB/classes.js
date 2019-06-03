const express = require('express');
const Class = express.Router();
const cors = require('cors');
Class.use(cors());
const parser = require('../parser/valueParser');
const db = require('../database/connection');

let pars;

module.exports = function addClasses(groupName){
    return new Promise((resolve,reject)=>{
        parser(groupName).then(pars=>{
            let mass = []
            for (let i = 0;i < pars.length;i++){
                let classes = pars[i]['classes'];
                if (mass.indexOf(classes) == -1){
                    mass.push(classes);
                    const sqlInsert = `INSERT INTO class (class_name) VALUES ('${classes}')`;
                    const sqlSelect = `SELECT * FROM class WHERE class.class_name = '${classes}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);
                        }
                    });
                }
            }
        }).catch(err=>{
            reject(err);
        });
    });
}
