import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import Timetable from "./Schedule"
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import axios  from 'axios';
import Store from './Store'
import { connect } from 'react-redux';
const history = createBrowserHistory();
const groupName = ""

class SearchGroup extends Component{


  constructor(props){
   super(props);
   this.goBack = this.goBack.bind(this);
}

goBack(){
    this.props.history.goBack();
}

weekClick(){
  if (document.getElementById('weekN').textContent == "1 неделя")
    document.getElementById('weekN').innerHTML = '2 неделя'

  else
    document.getElementById('weekN').innerHTML = '1 неделя'
  return(document.getElementById('weekN').textContent)
}

  GroupSchedule(){
    let time = []
     let dis = []
 //    let day = this.fweek.map((user) => {
 //     return <div>{user}</div>;
 // });
return (
  <div className="items">
    <div className="head_table">
      <h4 id="Name_day">12</h4>
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
          <div>12</div>
          <div className="Teacher">Черкасова</div>
          <div className="Rooms">корп ГЛ 412</div>
      </div>
    </div>
  </div>
)
}
  NumberWeek(){
    let date = new Date()
    let week1 = new Date(date.getFullYear(), 0 , 4)
    return (1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 -3 +(week1.getDay() + 6) % 7 ) / 7)) % 10
  }
  Manager = () =>(
   <div>
     <h2>В разработке</h2>
     <Link to="/Timetable">Вернуться</Link>
   </div>
  )
  Request = () =>(
   <div>
     <h2>В разработке</h2>
     <Link to="/Timetable">Вернуться</Link>
   </div>
  )
  Calendar = () =>(
   <div>
     <h2>В разработке</h2>
     <Link to="/Timetable">Вернуться</Link>
   </div>
  )

  Tab = () => (
    <div>
      <div className="Top">
        <div className="HGroup">
          <h2></h2>
          <h2>2 семестр 2018-2019г.</h2>
          <h3 id="date">{this.state.date} - {this.NumberWeek()-1} неделя</h3>
        </div>
        <div className="tabl">
          <div className="Timetable">
            <a className="TimetableClasses" href="#">Расписание занятий</a>
            <a className="TimetableSession" href="#">Расписание сессии</a>
          </div>
          <div className="week">
            <div className="arrow_week">
              <button onClick={(e) => this.weekClick(e)}>&lt;</button>
              <p id="weekN">1 неделя</p>
              <button href='#' onClick={(e) => this.weekClick(e)}>&gt;</button>
            </div>
          </div>
          <div className="tablic">
                {this.GroupSchedule()}
          </div>
        </div>
      </div>
    </div>
  )

  render() {

    let today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
      this.state = {
        date: date
      };
      console.log(this.props.users)
    return(
  <Router>
    <div className="container">
      <div className="nav">
        <div className="Up">
          <div className="logo_nav">
              <Link to="/Timetable"><img src="../favicon.png" /></Link>
          </div>
          <div className="nav_menu">
            <ul>
              <li><Link onClick={this.goBack}>Расписание</Link></li>
              <li><Link to="/Calendar">Календарь</Link></li>
              <li><Link to="/Manager">Менеджер кабинетов</Link></li>
              <li><Link to="/Request">Запросы</Link></li>
            </ul>
          </div>
        </div>
      </div>
      {/*<Route exact path="/Timetable/group" component={this.Tab}/>*/}
      <Route exact path="/Timetable" component={Timetable}/>
      <Route exact path="/Calendar" component={this.Calendar}/>
      <Route exact path="/Manager" component={this.Manager}/>
      <Route exact path="/Request" component={this.Request}/>
              {this.Tab()}
    </div>
  </Router>
    );
  }
}
const mapDispatchToProps = dispatch => ({

})
function mapStateToProps(state){
  return{
    users: state.users

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup);
