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


class SearchGroup extends Component{

  constructor(props){
     super(props);
     this.goBack = this.goBack.bind(this);
     this.state = {
       error: null,
       isLoaded: false,
       timetable: [],
       date : ''
     }
 }
test (){
    return new Promise((resolve,reject)=>{
      axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName: this.props.groupNumber } })
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
    let date = new Date()
    let week1 = new Date(date.getFullYear(), 0 , 4)
    return (Math.round(((date.getTime() - week1.getTime()) / 86400000 -7 +(week1.getDay() + 6) % 7 ) / 7)) % 10
  }

  componentDidMount() {
    let resTest;
    this.test()
    .then(res=>{
      this.dayYears();
        this.setState(
          {
            isLoaded: true,
            timetable: res
          }
        )
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
  if (document.getElementById('weekN').textContent == "1 неделя")
    document.getElementById('weekN').innerHTML = '2 неделя'


  else
    document.getElementById('weekN').innerHTML = '1 неделя'

}
  rasp(){
  let tt = {'fweek':this.state.timetable.fweek,
            'sweek':this.state.timetable.sweek}
  let  res_obj = [];
  let result = []
  let group = this.state.timetable.group
  result.push(group);
  result.push([])
  result.push([])
  let indexWeek = 0
  let weekDay = []
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
          Object.keys(tt[key][week][day]).forEach(function(lesson){
            if (tt[key][week][day][lesson].length == undefined){
              let k = 0
              for (let i in tt[key][week][day]){
                console.log(tt[key][week][day])
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
            }
            else{
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

    result = this.rasp()
    let g = ''
    const ddays = ['Понедельник','Вторник','Среда','Четрвег','Пятница','Суббота'];
    let week1 = {
        day:[],
        time:[],
        discp:[],
        teacher:[],
        kab:[]
    }
    let week2 = {
        day:[],
        time:[],
        discp:[],
        teacher:[],
        kab:[]
    }
    for(let j=0;j<7;j++){
        week1.time.push([])
        week1.discp.push([])
        week1.teacher.push([])
        week1.kab.push([])
    }
    let z = 0
    while (z != 7){
      for(let j=0;j<result[1].length;j++){
          if (result[1][j][6] == z){
            week1.time[z].push(result[1][j][4]+' '+result[1][j][5])
            week1.discp[z].push(result[1][j][0])
            week1.teacher[z].push(result[1][j][2])
            week1.kab[z].push(result[1][j][1])
          }
      }
      z++
    }

    for(let j=0;j<7;j++){
        week2.time.push([])
        week2.discp.push([])
        week2.teacher.push([])
        week2.kab.push([])
    }
   z = 0
    while (z != 7){
      for(let j=0;j<result[1].length;j++){
          if (result[1][j][6] == z){
            week2.time[z].push(result[1][j][4]+' '+result[1][j][5])
            week2.discp[z].push(result[1][j][0])
            week2.teacher[z].push(result[1][j][2])
            week2.kab[z].push(result[1][j][1])
          }
      }
      z++
    }

    console.log(week1)
    for (let j in weekDay[1]){
      week1.day.push(ddays[weekDay[1][j]])
    }
    for (let j in weekDay[2]){
      week2.day.push(ddays[weekDay[2][j]])
    }
    let n = 0
    let t =0
let NW = this.NumberWeek()
console.log(NW)
console.log(typeof(NW))
let uss  = ''

if ( NW == 1){
 uss =
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
                  {week1.teacher[n].map((tea) =>
                  <div className="Teacher">
                    <div>{tea}</div>
                  </div>)}
                  {week1.kab[n].map((ka) =>
                  <div className="Rooms">
                    <div>{ka}</div>
                  </div>)}
              </div>)}
            </div>
          </div>
        </div>
        {n++}
      </div>))}
      else{
    uss =
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
                      {week2.teacher[n].map((tea) =>
                      <div className="Teacher">
                        <div>{tea}</div>
                      </div>)}
                      {week2.kab[n].map((ka) =>
                      <div className="Rooms">
                        <div>{ka}</div>
                      </div>)}
                  </div>)}
                </div>
              </div>
            </div>
            {n++}
          </div>))}
          return uss;

  }


  Tab = () => (
    <div className="Top">
      <div className="HGroup">
        <h2 className="htop">{this.props.groupNumber}</h2>
        <h2>2 семестр 2018-2019г.</h2>
        <h3 id="date">{this.state.date} - {this.NumberWeek()} неделя</h3>
      </div>
      <div className="tabl">
        <div className="Timetable">
          <a className="TimetableClasses" href="#">Расписание занятий</a>
          <a className="TimetableSession" href="#">Расписание сессии</a>
        </div>
        <div className="week">
          <div className="arrow_week">
            <button onClick={(e) => this.weekClick(e)}>&lt;</button>
            <p id="weekN">{this.NumberWeek()} неделя</p>
            <button href='#' onClick={(e) => this.weekClick(e)}>&gt;</button>
          </div>
        </div>
        {this.rasp()}
      </div>
    </div>)

  render() {
      const { error, isLoaded, timetable } = this.state;
      if (error){
        return <div>Error: {timetable}</div>
      }
      else if (!isLoaded){
      return  <div>Loading...</div>
      }
      else{
        console.log(timetable.fweek)
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
            <Route exact path="/Timetable/group" children={this.Tab}/>
            <Route exact path="/Timetable" component={Timetable}/>
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
