const classes = require('./classes');
const classroom = require('./classroom');
const group = require('./group');
const parity = require('./parity');
const subgroup = require('./subgroup');
const teacher = require('./teacher');
const time = require('./time');
const weekday = require('./weekday');
const schedule = require('./schedule');
const date = require('./date');
const session = require('./session');
module.exports = function add(container){
    return new Promise((resolve,reject)=>{
        classes(container),
        classroom(container),
        group(container),
        parity(container),
        subgroup(container),
        teacher(container),
        time(container),
        weekday(container),
        date(container)
        setTimeout(()=>{
            session(container);
            schedule(container);
        },2000);
    });
};