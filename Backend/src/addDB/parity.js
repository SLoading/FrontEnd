const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/parser');
const db = require('../database/connection');


module.exports = function addParity(container){
    return new Promise((resolve,reject)=>{
            let mass = []
            for (let i = 0;i < container.length;i++){
                let parity = container[i]['parity'];
                if (mass.indexOf(parity) == -1){
                    mass.push(parity);
                    const sqlInsert = `INSERT INTO parity (parity) VALUES ('${parity}')`;
                    const sqlSelect = `SELECT * FROM parity WHERE parity = '${parity}'`;
                    db.query(sqlSelect,(err,resultSelect)=>{   
                        if (err) console.log(err);
                        if (resultSelect.length == 0){
                            db.query(sqlInsert);
                            
                        }
                    });
                }
            }
            resolve("Parity added");
        }).catch(err=>{
            reject(err);
        });
}


