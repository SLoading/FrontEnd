const request = require("request");
const needle = require('needle');
const cheerio = require('cheerio');
// urlGroup = "БПА18-02";





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


module.exports = function requestP(urlGroup) {
    url = `https://timetable.pallada.sibsau.ru/timetable/group/2018/2/${urlGroup}`;
    url = encodeURI(url);
    console.log(urlGroup);
    return new Promise((resolve,reject)=>{
        request(url,(err,res,body)=>{
            if (err){
                reject([]);
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

                console.log("end pars");
                resolve(containerResult);
            }
        });
    });
      
}
