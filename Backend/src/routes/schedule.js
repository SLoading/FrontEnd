const express = require('express');
const schedule = express.Router();
const getSchedule = require('../database/getSchedule');
const timetable = {};


function addSchedule(day,secondLesson){
    let lesson = {};
    let result;
    lesson.class = day.class;
    lesson.classroom = day.classroom;
    lesson.teacher = day.teacher;
    lesson.subgroup = day.subgroup;
    lesson.timeBegin = day.begin;
    lesson.timeEnd = day.end;
    if (secondLesson != undefined){
        let container = [];
        container[0] = lesson;
        lesson = {}
        lesson.class = secondLesson.class;
        lesson.classroom = secondLesson.classroom;
        lesson.teacher = secondLesson.teacher;
        lesson.subgroup = secondLesson.subgroup;
        lesson.timeBegin = secondLesson.begin;
        lesson.timeEnd = secondLesson.end;
        container[1] = lesson;
        result = container;
    }
    else{
        result = lesson;
    }
    return result;

}

function parsResult(day,timetable,secondLesson){
    let dayofweek;
    let lesson;
    if(day.weekday == "Понедельник"){
        if (timetable.monday === undefined){
            timetable.monday = {};
        }
        dayofweek = "monday";
        lesson = "L" + (Object.keys(timetable.monday).length + 1);
        timetable.monday[lesson] = {};
    }
    else if(day.weekday == "Вторник"){
        if (timetable.tuesday === undefined){
            timetable.tuesday = {};
        }
        lesson = "L" + (Object.keys(timetable.tuesday).length + 1);
        timetable.tuesday[lesson] = {};
        dayofweek = "tuesday";


    }
    else if(day.weekday == "Среда"){
        if (timetable.wednesday === undefined){
            timetable.wednesday = {};
        }
        lesson = "L" + (Object.keys(timetable.wednesday).length + 1);
        timetable.wednesday[lesson] = {};
        dayofweek = "wednesday";
    }
    else if(day.weekday == "Четверг"){
        if (timetable.thursday === undefined){
            timetable.thursday = {};
        }
        lesson = "L" + (Object.keys(timetable.thursday).length + 1);
        timetable.thursday[lesson] = {};
        dayofweek = "thursday";
    }
    else if(day.weekday == "Пятница"){
        if (timetable.friday === undefined){
            timetable.friday = {};
        }
        lesson = "L" + (Object.keys(timetable.friday).length + 1);
        timetable.friday[lesson] = {};
        dayofweek = "friday";
    }
    else{
        if (timetable.saturday === undefined){
            timetable.saturday = {};
        }
        lesson = "L" + (Object.keys(timetable.saturday).length + 1);
        timetable.saturday[lesson] = {};
        dayofweek = "saturday";
    }
    timetable[dayofweek][lesson] = addSchedule(day,secondLesson);

}


schedule.get("/api/getTimetable",(req,res)=>{
    let groupName = req.query.groupName;
    getSchedule(groupName)
    .then(result=>{
        timetable.group = result[0].group;
        timetable.fweek = {};
        timetable.sweek = {};
        let i = 0;
        let index;
        while(result.length != i){
            let secondLesson;
            index = i;
            try{
                if (result[i].parity === 1){
                    if(result[i].weekday === result[i+1].weekday){
                        if (result[i].begin === result[i+1].begin){
                            secondLesson = result[i+1];
                            i++;
                        }
                    }
                    parsResult(result[index],timetable.fweek,secondLesson);
                }
                else{
                    if(result[i].weekday === result[i+1].weekday){
                        if (result[i].begin === result[i+1].begin){
                            secondLesson = result[i+1];
                            i++;
                        }
                    }
                    parsResult(result[index],timetable.sweek,secondLesson);
                }
            }catch(err){
                parsResult(result[index],timetable.sweek,undefined);
            }
            i++;
        }
        res.send(timetable);
    }).catch(err=>{
        res.status(500).send('500:Internal Server Error');
    });
});


module.exports = schedule;
