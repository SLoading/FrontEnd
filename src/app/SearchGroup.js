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
  let tt = {'fweek':this.state.timetable.fweek,
            'sweek':this.state.timetable.sweek}
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
      Object.keys(tt[key]).forEach(function(week){
        weekd = tt[key][week].indexDay
          weekDay[indexWeek].push(tt[key][week].indexDay)
        Object.keys(tt[key][week]).forEach(function(day){
          console.log(tt[key][week])
          let flag = 0
          Object.keys(tt[key][week][day]).forEach(function(lesson){
            if (tt[key][week][day][lesson].length == undefined && flag == 0){
              let k = 0
              for (let i in tt[key][week][day]){
                  console.log(tt[key][week][day] + '\n' + i)
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
              console.log(res_obj)
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
    const ddays = ['Понедельник','Вторник','Среда','Четрвег','Пятница','Суббота'];

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
        let z = 0
        let a = 0
        let s = 0
        while (z != weekDay[1].length){
          s = result[1][a][6]
          for(let j=a;j<result[1].length;j++){
              if (result[1][j][6] == s){
                week1.time[z].push(result[1][j][4]+' - '+result[1][j][5])
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
    v1 =
    ( week1.day.map((day)=>
         <div className="tablic">
           <div className="items">
             <div className="head_table">
               <h4 id="Name_day">{day}</h4>
             </div>
             <div className="body_table">
               <div className="left_col">
                 <h5>Время</h5>
               {week1.time[n].map((tim) =>
                 <div className="time">
                   <div>{tim}</div>
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
       while (z != weekDay[2].length){
         s = result[2][a][6]
         for(let j=a;j<result[2].length;j++){
             if (result[2][j][6] == s){
               week2.time[z].push(result[2][j][4] + ' - ' + result[2][j][5])
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
       v2 =
       ( week2.day.map((day)=>
             <div className="tablic">
               <div className="items">
                 <div className="head_table">
                   <h4 id="Name_day">{day}</h4>
                 </div>
                 <div className="body_table">
                   <div className="left_col">
                     <h5>Время</h5>
                   {week2.time[n].map((tim) =>
                     <div className="time">
                       <div>{tim}</div>
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
          <Link to={`/Timetable/group/${this.props.match.params.num}`} className="TimetableClasses">Расписание занятий</Link>
          <a className="TimetableSession">Расписание сессии</a>
        </div>
        <div className="week">
          <div className="arrow_week">
            <button onClick={(e) => this.weekClick(e)}>&lt;</button>
              <p id="weekN">{this.state.dayN} неделя</p>
            <button href='#' onClick={(e) => this.weekClick(e)}>&gt;</button>
          </div>
        </div>
        {this.state.tabl}
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
                    <Link onClick={this.goBack}><img src="../favicon.png" /></Link>
                </div>
                <div className="nav_menu">
                  <ul>
                    <li><Link onClick={this.goBack}>Расписание</Link></li>
                    <li>Календарь</li>
                    <li>Менеджер кабинетов</li>
                    <li>Запросы</li>
                  </ul>
                </div>
              </div>
            </div>
            <Route  path={`/Timetable/group/${this.props.match.params.num}`} children={this.Tab}/>
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
