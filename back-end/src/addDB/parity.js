const express = require('express');
const weekday = express.Router();
const cors = require('cors');
weekday.use(cors());
const parser = require('../parser/valueParser');
const db = require('../database/connection');


module.exports = function addParity(groupName){
    return new Promise((resolve,reject)=>{
        parser(groupName).then(pars=>{
            let mass = []
            for (let i = 0;i < pars.length;i++){
                let parity = pars[i]['parity'];
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
    });
}
