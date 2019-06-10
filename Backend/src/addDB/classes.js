const express = require('express');
const Class = express.Router();
const cors = require('cors');
Class.use(cors());
const db = require('../database/connection');


module.exports = function addClasses(container){
    return new Promise((resolve,reject)=>{
            let mass = []
            for (let i = 0;i < container.length;i++){
                let classes = container[i]['classes'];
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
}
