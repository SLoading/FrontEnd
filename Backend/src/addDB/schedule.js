const express = require('express');
const cors = require('cors');
const parser = require('../parser/parser');
const db = require('../database/connection');

function addValues(p){
    return new Promise((resolve,reject)=>{
        db.query(p,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result[0]);
        });
    });
};


module.exports = function addSchedule(container){
    return new Promise(function(resolve,reject){
            for (let i = 0;i < container.length;i++){
                let classes = container[i]['classes'];
                let classroom = container[i]['classroom'];
                let group = container[i]['group'];
                let parity = container[i]['parity'];
                let subgroup = container[i]['subgroup'];
                let teacher = container[i]['teacher'];
                let timeBeg = container[i]['timeBeg'];
                let dayofweek = container[i]['weekday'];
                if (container[i]['date'] === undefined){
                    Promise.all([
                        addValues(`SELECT idclass FROM class WHERE class_name = '${classes}'`),
                        addValues(`SELECT idclassroom FROM classroom WHERE classroom = '${classroom}'`),
                        addValues(`SELECT idgroup FROM sibgu.group WHERE group_name = '${group}'`),
                        addValues(`SELECT idparity FROM parity WHERE parity = '${parity}'`),
                        addValues(`SELECT idsubgroup FROM subgroup WHERE subgroup = '${subgroup}'`),
                        addValues(`SELECT idteacher FROM teacher WHERE FIO = '${teacher}'`),
                        addValues(`SELECT idtime FROM time WHERE timeBeg = '${timeBeg}'`),
                        addValues(`SELECT idweekday FROM weekday WHERE weekday_name = '${dayofweek}'`)])
                        .then(result=>{
                            classes = result[0]['idclass'];
                            classroom = result[1]['idclassroom'];
                            group = result[2]['idgroup'];
                            parity = result[3]['idparity'];
                            subgroup = result[4]['idsubgroup'];
                            teacher = result[5]['idteacher'];
                            timeBeg = result[6]['idtime'];
                            dayofweek = result[7]['idweekday'];
                            const sqlSelect = `SELECT * FROM schedule WHERE  schedule.group = '${group}' and 
                                                                        class = '${classes}' and
                                                                        classroom = '${classroom}' and
                                                                        teacher = '${teacher}' and
                                                                        weekday = '${dayofweek}' and
                                                                        parity = '${parity}' and 
                                                                        time = '${timeBeg}' and
                                                                        subgroup = '${subgroup}'`;
                            db.query(sqlSelect,function(err,resultSelect){   
                                if (err) console.log(err);
                                    if (resultSelect.length == 0){
                                        db.query(`INSERT INTO sibgu.schedule (schedule.group,class,classroom,teacher,weekday,parity,time,subgroup)
                                                                            VALUES ('${group}','${classes}','${classroom}','${teacher}',
                                                                                    '${dayofweek}','${parity}','${timeBeg}','${subgroup}')`);
                                    }
                            });
                        }).catch(err=>{
                        console.log(err);
                        }); 
                }
            }
        }).catch(function(err){
            reject(err);
        });
        resolve("Schedule added");
};


