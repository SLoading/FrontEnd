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


module.exports = function addSession(container){
    return new Promise(function(resolve,reject){
            for (let i = 0;i < container.length;i++){
                let classes = container[i]['classes'];
                let classroom = container[i]['classroom'];
                let group = container[i]['group'];
                let date = container[i]['date'];
                let teacher = container[i]['teacher'];
                let timeBeg = container[i]['timeBeg'];
                if (date !== undefined){
                    Promise.all([
                        addValues(`SELECT idclass FROM class WHERE class_name = '${classes}'`),
                        addValues(`SELECT idclassroom FROM classroom WHERE classroom = '${classroom}'`),
                        addValues(`SELECT idgroup FROM sibgu.group WHERE group_name = '${group}'`),
                        addValues(`SELECT iddate FROM date WHERE date = '${date}'`),
                        addValues(`SELECT idteacher FROM teacher WHERE FIO = '${teacher}'`),
                        addValues(`SELECT idtime FROM time WHERE timeBeg = '${timeBeg}' and timeEnd = ''`)])
                        .then(result=>{
                            classes = result[0]['idclass'];
                            classroom = result[1]['idclassroom'];
                            group = result[2]['idgroup'];
                            date = result[3]['iddate'];
                            teacher = result[4]['idteacher'];
                            timeBeg = result[5]['idtime'];
                            const sqlSelect = `SELECT * FROM session WHERE  session.group = '${group}' and 
                                                                           class = '${classes}' and
                                                                           classroom = '${classroom}' and
                                                                           teacher = '${teacher}' and
                                                                           date = '${date}' and
                                                                           time = '${timeBeg}'`;
                            db.query(sqlSelect,function(err,resultSelect){   
                                if (err) console.log(err);
                                    if (resultSelect.length == 0){
                                        db.query(`INSERT INTO sibgu.session (session.group,class,classroom,date,teacher,time)
                                                                              VALUES ('${group}','${classes}','${classroom}','${date}',
                                                                                      '${teacher}','${timeBeg}')`);
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
        resolve("Session added");
};