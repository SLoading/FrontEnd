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
}

goBack(){
    this.props.history.goBack();
}
NumberWeek(){
    let date = new Date()
    let week1 = new Date(date.getFullYear(), 0 , 4)
    return (Math.round(((date.getTime() - week1.getTime()) / 86400000 -7 +(week1.getDay() + 6) % 7 ) / 7)) % 10
  }
dayYears(){
    let today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
      this.state = {
        date: date
      };
      return this.state.date
  }
weekClick(){
  if (document.getElementById('weekN').textContent == "1 неделя")
    document.getElementById('weekN').innerHTML = '2 неделя'

  else
    document.getElementById('weekN').innerHTML = '1 неделя'
  return(document.getElementById('weekN').textContent)

}
  rasp = () =>{
    let List = this.props.groupNumber.fweek
    console.log(List)
    return(
      <div>
      </div>
    )
  }
  Tab = () => (
    <div className="Top">
      <div className="HGroup">
        <h2 className="htop">{this.props.groupNumber.group}</h2>
        <h2>2 семестр 2018-2019г.</h2>
        <h3 id="date">{this.dayYears()} - {this.NumberWeek()} неделя</h3>
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
        <div className="tablic">
        {this.rasp}
          <div className="items">
            <div className="head_table">
              <h4 id="Name_day">123</h4>
            </div>
            <div className="body_table">
              <div className="left_col">
                <h5>Время</h5>
                <div className="time">
                  <div>12</div>
                </div>
              </div>
              <div className="right_col">
                <h5>Дисциплина</h5>
                  <div><p>12</p></div>
                  <div className="Teacher"><p>Черкасова</p></div>
                  <div className="Rooms"><p>корп ГЛ 412</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  render() {
      console.log(this.props.groupNumber);
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
      <Route exact path="/Timetable/group" component={this.Tab}/>
      <Route exact path="/Timetable" component={Timetable}/>
    </div>
  </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    groupNumber: state.Timetable
  }
}

export default connect(mapStateToProps,null)(SearchGroup);
