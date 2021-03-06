const request = require("request");
const needle = require('needle');
const cheerio = require('cheerio');
year = "2018";
semester = "2";
urlTest = ["БПА16-01 (23-7)"];
urlGroup = ["БПА18-01","БПА18-02","БПА17-01","БПА16-01 (23-7)","24-7",
            "БИМ18-01","БИМВ18-01","БИМ17-01","БИМ16-01 (23-6)","24-6",
            "БИН18-01","БИН17-01","БИН16-01 (23-8)","БИНВ16-01 (10092-31)","24-8",
            "БТТ16-01 (23-1)"];





function addLastValue(timetableObject,containerResult,subgroup,day,timeBeg,timeEnd,parity,groupString){
    timetableObject["subgroup"] = subgroup;
    if (day.trim().length > 11){
        let updateDay = "";
        for(let i in day.trim()){
            if (day.trim().charAt(i) == " "){
                break;
            }
            updateDay += day.trim().charAt(i);
        }
        day = updateDay;
    }
    timetableObject["weekday"] = day.trim();
    timetableObject["timeBeg"] = timeBeg;
    timetableObject["timeEnd"] = timeEnd;
    timetableObject["parity"] = parity;
    timetableObject["group"] = groupString;
    containerResult.push(timetableObject);
}


function calculate(weekNumber,parity,groupString,containerResult,$){
    let timetableObject = {}
    let parityWeek;
    if (parity == 1){
        parityWeek = 1;
    }
    else{
        parityWeek = 0;
    }
    weekNumber.each(function(i,val){
        let day = $(val).children("div.header").children("div.name").text();
        divBody = $(val).children("div.body").children("div.line");
        divBody.each(function(i,val){
            let time = $(val).children("div.time").children("div.hidden-xs").text();
            let flagTime = true;
            let stringTimeBeg = "";
            let stringTimeEnd = "";
            for (let i in time.trim()){
                if (time.trim().charAt(i) == "-"){
                    flagTime = false;
                    continue;
                }
                if (flagTime){
                    stringTimeBeg += time.trim().charAt(i);
                }
                else{
                    stringTimeEnd += time.trim().charAt(i);
                }
            }
            let classes = $(val).children("div.discipline").children("div").children("div").children("ul").children("li");
            let len = classes.length;
            let flag = false;
            let subgroup;
            classes.each(function(i,val){
                if (len < 4){ // Если запись без подгрупп
                    if (i == 0){
                        timetableObject["classes"] = $(val).text();
                    }
                    else if (i == 1){
                        timetableObject["teacher"] = $(val).text();
                    }
                    else{
                        timetableObject["classroom"] = $(val).text();
                        addLastValue(timetableObject,containerResult,null,day.trim(),stringTimeBeg,stringTimeEnd,parityWeek,groupString);
                        timetableObject = {};
                    }
                    
                }
                else{ // если записи с подгруппой
                    if (i == 0 && $(val).text().indexOf("подгруппа") == 2){
                        flag = true;
                    }
                    // Если у одной из подгрупп занятие
                    if (i == 0 && flag == false){
                        timetableObject["classes"] = $(val).text();
                    }
                    else if (i == 1 && flag == false){
                        timetableObject["teacher"] = $(val).text();
                    }
                    else if (i == 2 && flag == false){
                        timetableObject["classroom"] = $(val).text();
                    }
                    else if (i == 3 && flag == false){
                        addLastValue(timetableObject,containerResult,$(val).text(),day.trim(),stringTimeBeg,stringTimeEnd,parityWeek,groupString);
                        timetableObject = {};
                    }

                    // Если у обеих подгрупп занятие но разные
                    if ((i == 0 || i == 4) && flag == true){
                        subgroup = $(val).text();
                    }
                    else if ((i == 1 || i == 5) && flag == true){
                        timetableObject["classes"] = $(val).text();
                    }
                    else if ((i == 2 || i == 6) && flag == true){
                        timetableObject["teacher"] = $(val).text();
                    }
                    else if ((i == 3 || i == 7) && flag == true){
                        timetableObject["classroom"] = $(val).text();
                        addLastValue(timetableObject,containerResult,subgroup,day.trim(),stringTimeBeg,stringTimeEnd,parityWeek,groupString);
                        timetableObject = {};
                    }
                }
                
            });
        });                  
    });
}


module.exports = function requestP() {
        console.log(urlGroup.length);
        for (let index in urlGroup){
            new Promise((resolve,reject)=>{
            url = `https://timetable.pallada.sibsau.ru/timetable/group/2018/2/${urlGroup[index]}`;
            url = encodeURI(url);
            request(url,(err,res,body)=>{
                if (err){
                    reject(err);
                }
                else{
                    const $ = cheerio.load(body);
            
                    
                    var containerResult = [];

                    const group = $("div.container").children("h3").text().trim();
                    let groupString = "";
                    for (let i = 1;i < group.length;i++){
                        if (group.charAt(i) == " " || group.charAt(i) == '"'){
                            break;
                        }
                        groupString += group.charAt(i);
                    }

                    mainElementTreeWeek1 = $("div.tab-content").children("div").children("div.tab-content").children("div#week_1_tab").children("div");
                    mainElementTreeWeek2 = $("div.tab-content").children("div").children("div.tab-content").children("div#week_2_tab").children("div");

                    calculate(mainElementTreeWeek1,1,groupString,containerResult,$);
                    calculate(mainElementTreeWeek2,2,groupString,containerResult,$);
                    
                    mainElementTreeSession = $("div.tab-content").children("div#session_tab").children("div.day");
                    mainElementTreeSession.each(function(i,val){
                        let date = $(val).children("div.header").children("div.name").text().trim();

                        if (date.length > 10){
                            date = date.slice(0,10);
                        }
                        let timeBeg = $(val).children("div.body").children("div").children("div.time").text().trim();
                        let line = $(val).children("div.body").children("div").children("div.discipline").children("div").children("div").children("ul").children("li");
                        let discipline = {"date":date,
                                          "timeBeg":timeBeg,
                                          "timeEnd":''};
                        line.each(function(i,col){
                            if (i === 0)
                                discipline.classes = $(col).text().trim();
                            else if (i === 1)
                                discipline.teacher = $(col).text().trim();
                            else
                                discipline.classroom = $(col).text().trim();
                        });
                        discipline.group = groupString;
                        containerResult.push(discipline);

                    });
                    

                    const addInDB = require('../addDB/addInDB');
                    addInDB(containerResult);
                }
            });
            resolve("END PARSER");

        });
        
        }
    
      
}
