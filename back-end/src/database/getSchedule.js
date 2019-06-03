const db = require('./connection');
let id;



module.exports = function getSchedule(groupName){
    return new Promise((resolve,reject)=>{
        db.query(`SELECT idgroup FROM sibgu.group WHERE group_name = '${groupName}'`,(err,result)=>{
            if (err) reject(err);
            id = result[0]["idgroup"];
            let sqlSelectSchedule = `SELECT distinct class.class_name AS 'class',
                                         classroom.classroom,
                                         sibgu.group.group_name AS 'group',
                                         subgroup.subgroup,
                                         parity.parity,
                                         teacher.FIO AS 'teacher',
                                         sibgu.time.timeBeg AS begin,
                                         sibgu.time.timeEnd AS end,
                                         weekday.weekday_name AS 'weekday'
                                        FROM schedule,class,classroom,sibgu.group,parity,teacher,subgroup,time,weekday 
                                        WHERE schedule.group = ${parseInt(id)} and 
                                              schedule.class = class.idclass  and
                                              schedule.classroom = classroom.idclassroom and
                                              schedule.group = sibgu.group.idgroup and
                                              schedule.subgroup = subgroup.idsubgroup and
                                              schedule.parity = parity.idparity and 
                                              schedule.teacher = teacher.idteacher and 
                                              schedule.time = time.idtime and
                                              schedule.weekday = weekday.idweekday;`;
            db.query(sqlSelectSchedule,(err,result)=>{
                resolve(result);
            });

        });
    });
    
};
