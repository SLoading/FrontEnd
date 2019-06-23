import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import Timetable from "./Schedule"
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import axios  from 'axios';
import Store from './Store'
import { connect } from 'react-redux'
const history = createBrowserHistory();
const groupName = "";
const store = new  Store();

let n = 0
let t = 0
let v1
let vs
let v2
let ur

  let weekDay = []
let result = []
class SearchGroup extends Component{

  constructor(props){
     super(props);
     this.goBack = this.goBack.bind(this);
     this.state = {
       error: null,
       isLoaded: false,
       timetable: [],
       date : '',
      dayN : this.NumberWeek(),
      tabl: ''

     }
 }

//  componentWillUpdate(newProps, newState) {
//    console.log("componentWillUpdate")
//    // if (this.NumberWeek() == 2){
//    //    this.setState({
//    //      tabl: v1
//    //      })}
//
// }
componentDidUpdate(prevProps,prevState) {
  console.log(prevState)
  if (prevState.dayN !== this.state.dayN) {
    console.log("componentDidUpdate")
}}
test (){
    return new Promise((resolve,reject)=>{
      axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName:this.props.match.params.num } })
        .then(res => {
          console.log(res.data)
           resolve(res.data)
        })
        .catch(err => {
          reject(err)
        });
    })

}

goBack(){
    this.props.history.goBack();
}
NumberWeek(){
  let numb = 0
  var d0 = new Date ().getTime (),
  d  = new Date (new Date ().getFullYear (), 0, 1),
  d1 = d.getTime (),
  dd = d.getDay (),
  re = Math.floor ((d0 - d1) / 8.64e7) + (dd ? dd - 1 : 6);
  if ((Math.floor (re / 7) % 2) == 1)
    numb = 2
  else
    numb = 1
    return numb
  }

  componentDidMount() {
    this.test()
    .then(res=>{
      this.dayYears();
        this.setState(
          {
            isLoaded: true,
            timetable: res
          }
        )
        this.rasp()
    })
    .catch(err=>{
      this.setState(
        {
          timetable: err,
          isLoaded: true,
          error :true
        }
      )
    })

  }



dayYears(){
    let today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

      this.setState({
        date: date
      })
  }
  raspClick(e){
    e.preventDefault()
    let raspis = document.getElementById("TC")
    let sesss = document.getElementById("TS")
    raspis.style.background = '#006cb5'
    raspis.style.color = '#fff'
    sesss.style.background = '#fff'
    sesss.style.color = '#006cb5'
    if (this.state.dayN == 1){
      this.setState(
        {
          dayN:1,
          tabl: v1
        }
      )
    }
    else{
      this.setState(
        {
          dayN:2,
          tabl: v2
        }
      )
  }
  }
  sessClick(e){
    e.preventDefault()
    let raspis = document.getElementById("TC")
    let sesss = document.getElementById("TS")
    raspis.style.background = '#fff'
    raspis.style.color = '#006cb5'
    sesss.style.background = '#006cb5'
    sesss.style.color = '#fff'
    this.setState(
      {
        tabl:vs
      }
    )
  }
weekClick(){
  if (this.state.dayN == 1){
    this.setState(
      {
        dayN:2,
        tabl: v2
      }
    )
  }
  else{
    this.setState(
      {
        dayN: 1,
        tabl: v1
      }
    )
}}
ClickGoSearch(){
  this.props.history.push('/Timetable/Search')
}
SsumT(){
  t++
}
Snull(){
  t=0
}
Nsum(){
  n++
}
Nnull(){
  n = 0
}

  rasp(){
  v1 = ''
  v2 = ''
  result = []
  weekDay = []
  let sess = []
  let tt = {'fweek':this.state.timetable.fweek,
            'sweek':this.state.timetable.sweek,
            }
  console.log(this.state.timetable.session)
  let  res_obj = [];
  let group = this.state.timetable.group
  result.push(group);
  result.push([])
  result.push([])
  let indexWeek = 0

  let weekd = ''
  weekDay.push([])
  weekDay.push([])
  weekDay.push([])
    Object.keys(tt).forEach(function(key){
      indexWeek++

      console.log(sess)
      Object.keys(tt[key]).forEach(function(week){
        weekd = tt[key][week].indexDay
          weekDay[indexWeek].push(tt[key][week].indexDay)
        Object.keys(tt[key][week]).forEach(function(day){
          let flag = 0
          Object.keys(tt[key][week][day]).forEach(function(lesson){
            if (tt[key][week][day][lesson].length == undefined && flag == 0){
              let k = 0

              for (let i in tt[key][week][day]){

                Object.keys(tt[key][week][day][i]).forEach(function(les){

                  if (k < 5){
                    res_obj.push(tt[key][week][day][i][les]);

                  }
                  else if (k == 5){
                    res_obj.push(tt[key][week][day][i][les]);
                    res_obj.push(weekd)
                    result[indexWeek].push(res_obj)
                    res_obj = []

                  }
                  else if (k > 5){
                    res_obj.push(tt[key][week][day][i][les]);
                  }
                  k++
                })
              }
              res_obj.push(weekd)
              result[indexWeek].push(res_obj)
              res_obj = []
              flag = 1
            }
            else if(tt[key][week][day][lesson].length != undefined){
              res_obj.push(tt[key][week][day][lesson])

            }
          })
          if (res_obj.length != 0){
            res_obj.push(weekd)
            result[indexWeek].push(res_obj)
          }
          res_obj = []
        })
      })
    })
    console.log(result)
    let  res_ekz = [];
    let st = {'session':this.state.timetable.session
              }
    Object.keys(st).forEach(function(key){
        Object.keys(st[key]).forEach(function(l){
          Object.keys(st[key][l]).forEach(function(le){
              sess.push(st[key][l][le])
          })
        })
      })
      let o = 0
      let sss = []
      sss.push([])
        let q = 0
      for( let i in sess){
        if (o ==7){
          o = 0;
          sss.push([])
          q++
          sss[q].push([sess[i]])
        }
        else
          sss[q].push([sess[i]])
        o++
      }
      console.log(sss)
    const ddays = ['Понедельник','Вторник','Среда','Четрвег','Пятница','Суббота'];
      let ses = {
        date:[],
        time:[],
        disp:[],
        teacher:[],
        kab:[]
      }
      console.log(sss.length)
      for(let j=0;j<sss.length;j++){
          ses.time.push([])
          ses.disp.push([])
          ses.teacher.push([])
          ses.kab.push([])
      }
      let z = 0
      let a = 0
      let s = 0
      let prevTime = null
        for(let j=0;j<sss.length;j++){
              ses.time[j].push(sss[j][4][0])
              ses.disp[j].push(sss[j][0][0])
              ses.teacher[j].push(sss[j][3][0])
              ses.kab[j].push(sss[j][1][0])
              ses.date.push(sss[j][6][0])
              }

              n = 0
              let abv = null
              console.log(ses)
              let today = new Date(),
                date = today.getDate() + '.0' + (today.getMonth() + 1) + '.' + today.getFullYear();
                console.log(date)
                        console.log(today.getDay())
              let weekday=new Array(7);
                weekday[0]="Воскресенье";
                weekday[1]="Понедельник";
                weekday[2]="Вторник";
                weekday[3]="Среда";
                weekday[4]="Четверг";
                weekday[5]="Пятница";
                weekday[6]="Суббота";
                let dddddd = weekday[today.getDay()]
                console.log(dddddd)
          vs =
          ( ses.date.map((dat)=>
               <div className="tablic">
                 <div className="items">
                  {dat == date ? <div className="head_table"><h4 id="Name_day">{dat}</h4><div className="circleIn"></div></div> : <div className="head_table"><h4>{dat}</h4></div>}
                   <div className="body_table">
                     <div className="left_col">
                       <h5>Время</h5>
                     {ses.time[n].map((tim) =>
                       <div className="time">
                        <div>{tim}</div>
                       </div>
                       )}
                     </div>
                     <div className="right_col">
                       <h5>Дисциплина</h5>
                       {ses.disp[n].map((dis) =>
                       <div className="discip">
                           <div>
                             <div>{dis}</div>
                           </div>
                           <div className="Teacher">
                             <div>{ses.teacher[n][t]}</div>
                           </div>
                           <div className="Rooms">
                             <div>{ses.kab[n][t]}</div>
                           </div>
                           {this.SsumT()}
                       </div>)}
                     </div>
                   </div>
                 </div>
                 {this.Snull()}
                 {this.Nsum()}
               </div>)
             )

        let week1 = {
            day:[],
            time:[],
            discp:[],
            teacher:[],
            kab:[]
        }

        for(let j=0;j<weekDay[1].length;j++){
            week1.time.push([])
            week1.discp.push([])
            week1.teacher.push([])
            week1.kab.push([])
        }
         z = 0
         a = 0
         s = 0
         prevTime = null
        while (z != weekDay[1].length){
          s = result[1][a][6]
          for(let j=a;j<result[1].length;j++){
              if (result[1][j][6] == s){
                if (result[1][j][4] == prevTime)
                  week1.time[z].push('')
                else{
                  prevTime = result[1][j][4]
                  week1.time[z].push(result[1][j][4]+' - '+result[1][j][5])}
                week1.discp[z].push(result[1][j][0])
                week1.teacher[z].push(result[1][j][2])
                if (result[1][j][3] == "null"){
                  week1.kab[z].push(result[1][j][1])}
                else{
                  week1.kab[z].push(result[1][j][1]+ ' ' + '('+ result[1][j][3]+')')}
                a++
              }
              else
                break
          }
          z++
        }

        for (let j in weekDay[1]){
          week1.day.push(ddays[weekDay[1][j]])
        }

        n = 0
        abv = null


    v1 =
    ( week1.day.map((day)=>
         <div className="tablic">
            {day == dddddd && this.NumberWeek() == 1 ? <div className="head_table"><h4 id="Name_day">{day}</h4><div className="circleIn"></div></div> : <div className="head_table"><h4>{day}</h4></div>}
             <div className="body_table">
               <div className="left_col">
                 <h5>Время</h5>
               {week1.time[n].map((tim) =>
                 <div>
                 {tim != '' ? <div className="time"><div>{tim}</div></div> : <div className="timeSubgroup"><div >{tim}</div></div>}
                 </div>)}
               </div>
               <div className="right_col">
                 <h5>Дисциплина</h5>
                 {week1.discp[n].map((dis) =>
                 <div className="discip">
                     <div>
                       <div>{dis}</div>
                     </div>
                     <div className="Teacher">
                       <div>{week1.teacher[n][t]}</div>
                     </div>
                     <div className="Rooms">
                       <div>{week1.kab[n][t]}</div>
                     </div>
                     {this.SsumT()}
                 </div>)}
             </div>
           </div>
           {this.Snull()}
           {this.Nsum()}
         </div>)
       )
       let week2 = {
           day:[],
           time:[],
           discp:[],
           teacher:[],
           kab:[]
       }

       for(let j=0;j<weekDay[2].length;j++){
           week2.time.push([])
           week2.discp.push([])
           week2.teacher.push([])
           week2.kab.push([])
       }
        z = 0
        a = 0
        s = 0
        prevTime = null
       while (z != weekDay[2].length){
         s = result[2][a][6]
         for(let j=a;j<result[2].length;j++){
             if (result[2][j][6] == s){
               if (result[2][j][4] == prevTime)
                 week2.time[z].push('')
               else{
                 prevTime = result[2][j][4]
                 week2.time[z].push(result[2][j][4]+' - '+result[2][j][5])}
               week2.discp[z].push(result[2][j][0])
               week2.teacher[z].push(result[2][j][2])
               if (result[2][j][3] == "null"){
                 week2.kab[z].push(result[2][j][1])}
               else{
                 week2.kab[z].push(result[2][j][1]+ ' ' + '('+ result[2][j][3]+')')}
               a++
             }
             else
               break
         }
         z++
       }

       for (let j in weekDay[2]){
         week2.day.push(ddays[weekDay[2][j]])
       }
         n = 0
         abv = null
       v2 =
       ( week2.day.map((day)=>
             <div className="tablic">
                 {day == dddddd && this.NumberWeek() == 2 ? <div className="head_table"><h4 id="Name_day">{day}</h4><div className="circleIn"></div></div> : <div className="head_table"><h4>{day}</h4></div>}
                 <div className="body_table">
                   <div className="left_col">
                     <h5>Время</h5>
                   {week2.time[n].map((tim) =>
                     <div>
                     {tim != '' ? <div className="time"><div>{tim}</div></div> : <div className="timeSubgroup"><div ></div></div>}
                     </div>)}
                   </div>
                   <div className="right_col">
                     <h5>Дисциплина</h5>
                     {week2.discp[n].map((dis) =>
                     <div className="discip">
                         <div>
                           <div>{dis}</div>
                         </div>
                         <div className="Teacher">
                           <div>{week2.teacher[n][t]}</div>
                         </div>
                         <div className="Rooms">
                           <div>{week2.kab[n][t]}</div>
                         </div>
                         {this.SsumT()}
                     </div>)}
                 </div>
               </div>
               {this.Snull()}
               {this.Nsum()}
             </div>))
             if (this.NumberWeek() == 1){
             this.setState({
               tabl: v1
             })}
             else{
               this.setState({
                 tabl: v2
               })}

       }




  Tab = () => (
    <Router>
    <div className="Top">
      <div className="HGroup">
        <h2 className="htop">{this.props.match.params.num}</h2>
        <h2>2 семестр 2018-2019г.</h2>
        <h3 id="date">{this.state.date} - {this.NumberWeek()} неделя</h3>
      </div>
      <div className="tabl">
        <div className="Timetable">
          <Link to={`/Timetable/group/${this.props.match.params.num}`} onClick={(e) => this.raspClick(e)} className="TimetableClasses" id="TC">Расписание занятий</Link>
          <Link to={`/Timetable/group/${this.props.match.params.num}/session`} onClick={(e) => this.sessClick(e)} className="TimetableSession" id="TS">Расписание сессии</Link>
        </div>
        {this.state.tabl !=vs ?
          <div>
        <div className="week">
          <div className="arrow_week">
            <button onClick={(e) => this.weekClick(e)}>&lt;</button>
              <p id="weekN">{this.state.dayN} неделя</p>
            <button href='#' onClick={(e) => this.weekClick(e)}>&gt;</button>
          </div>
        </div>
        {this.state.tabl}</div> : <div className="otstup">{this.state.tabl}</div>}
      </div>
    </div>
  </Router>)

  render() {
      const { error, isLoaded, timetable } = this.state;
      if (error){
        return <div>Error: {timetable}</div>
      }
      else if (!isLoaded){
        return  <div>Loading...</div>
      }
      else{

      return(
        <Router>
          <div className="container">
            <div className="nav">
              <div className="Up">
                <div className="logo_nav">
                    <a href="/Timetable/Search"><img src="/favicon.png" /></a>
                </div>
                <div className="nav_menu">
                  <ul>
                    <li><a href="/Timetable/Search">Расписание</a></li>
                    <li>Календарь</li>
                    <li>Менеджер кабинетов</li>
                    <li>Запросы</li>
                  </ul>
                </div>
              </div>
            </div>
            <Route path={`/Timetable/group/${this.props.match.params.num}`} children={this.Tab}/>
          </div>
        </Router>
    );
  }
}}

const mapStateToProps = (state) => {
  return{
    groupNumber: state.Timetable
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    addPost: (group) => { dispatch({type: 'ADD_POST',group: this.props.groupNumber}) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchGroup);
