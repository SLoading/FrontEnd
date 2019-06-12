const express = require('express');
const schedule = express.Router();
const getSchedule = require('../database/getSchedule');
const timetable = {};
const days = ['monday','tuesday','wednesday','thursday','friday','saturday'];


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
    let indexDay;
    if(day.weekday == "Понедельник"){
        dayofweek = "monday";
        if (timetable[dayofweek] === undefined){
            timetable[dayofweek] = {};
            timetable[dayofweek]['indexDay'] = days.indexOf(dayofweek);
        }
        lesson = "L" + (Object.keys(timetable[dayofweek]).length);
        timetable[dayofweek][lesson] = {};
    }
    else if(day.weekday == "Вторник"){
        dayofweek = "tuesday";
        if (timetable[dayofweek] === undefined){
            timetable[dayofweek] = {};
            timetable[dayofweek]['indexDay'] = days.indexOf(dayofweek);
        }
        lesson = "L" + (Object.keys(timetable[dayofweek]).length);
        timetable[dayofweek][lesson] = {};


    }
    else if(day.weekday == "Среда"){
        dayofweek = "wednesday";
        if (timetable[dayofweek] === undefined){
            timetable[dayofweek] = {};
            timetable[dayofweek]['indexDay'] = days.indexOf(dayofweek);
        }
        lesson = "L" + (Object.keys(timetable[dayofweek]).length);
        timetable[dayofweek][lesson] = {};

    }
    else if(day.weekday == "Четверг"){
        dayofweek = "thursday";
        if (timetable[dayofweek] === undefined){
            timetable[dayofweek]= {};
            timetable[dayofweek]['indexDay'] = days.indexOf(dayofweek);
        }
        lesson = "L" + (Object.keys(timetable[dayofweek]).length);
        timetable[dayofweek][lesson] = {};

    }
    else if(day.weekday == "Пятница"){
        dayofweek = "friday";
        if (timetable[dayofweek] === undefined){
            timetable[dayofweek] = {};
            timetable[dayofweek]['indexDay'] = days.indexOf(dayofweek);
        }
        lesson = "L" + (Object.keys(timetable[dayofweek]).length);
        timetable[dayofweek][lesson] = {};

    }
    else{
        dayofweek = "saturday";
        if (timetable[dayofweek] === undefined){
            timetable[dayofweek] = {};
            timetable[dayofweek]['indexDay'] = days.indexOf(dayofweek);
        }
        lesson = "L" + (Object.keys(timetable[dayofweek]).length);
        timetable[dayofweek][lesson] = {};

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
        res.status(400).send('500:Bad request');
    });
});


module.exports = schedule;
