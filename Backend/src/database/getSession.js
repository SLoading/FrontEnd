const db = require('./connection');
let id;



module.exports = function getSession(groupName){
    return new Promise((resolve,reject)=>{
        db.query(`SELECT idgroup FROM sibgu.group WHERE group_name = '${groupName}'`,(err,result)=>{
            if (err) reject(err);
            try{
                id = result[0]["idgroup"];
                let sqlSelectSession= `SELECT distinct class.class_name AS 'class',
                                        classroom.classroom,
                                        sibgu.group.group_name AS 'group',
                                        teacher.FIO AS 'teacher',
                                        sibgu.time.timeBeg AS 'timeBeg',
                                        sibgu.time.timeEnd AS 'timeEnd',
                                        sibgu.date.date
                                        FROM session,class,classroom,sibgu.group,teacher,time,date
                                        WHERE session.group = '${id}' and 
                                            session.class = class.idclass  and
                                            session.classroom = classroom.idclassroom and
                                            session.group = sibgu.group.idgroup and
                                            session.teacher = teacher.idteacher and 
                                            session.time = time.idtime and
                                            session.date = date.iddate
                                        ORDER BY session.idsession`;
                db.query(sqlSelectSession,(err,result)=>{
                    resolve(result);
                });
            }
            catch(err){
                reject(err);
            }

        });
    });
    
};
