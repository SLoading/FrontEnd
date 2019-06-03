const classes = require('./classes');
const classroom = require('./classroom');
const group = require('./group');
const parity = require('./parity');
const subgroup = require('./subgroup');
const teacher = require('./teacher');
const time = require('./time');
const weekday = require('./weekday');
const schedule = require('./schedule');
module.exports = function add(groupName){
    return new Promise((resolve,reject)=>{
        classes(groupName),
        classroom(groupName),
        group(groupName),
        parity(groupName),
        subgroup(groupName),
        teacher(groupName),
        time(groupName),
        weekday(groupName)
        setTimeout(()=>{
            schedule(groupName);
        },2000);
    });
};
