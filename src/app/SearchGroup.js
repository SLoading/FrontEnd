import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import Timetable from "./Schedule"
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import axios  from 'axios';
const history = createBrowserHistory();
const groupName = ""
class SearchGroup extends Component{
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
  render() {
    let today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
      this.state = {
        date: date
      };
      console.log("ad " + groupName)
      let group = "БПА16-01"
      axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName:group} })
        .then(res => {
          groupName = res.data.group
          group = groupName
          console.log(groupName)
        })
        .catch(err=>{
          console.log(err);
        })
    return(
        <div className="container">
              <Router>
      <div className="nav">
        <div className="Up">
          <div className="logo_nav">
              <Link to="/Timetable"><img src="./favicon.png" /></Link>
          </div>
          <div className="nav_menu">
            <ul>
              <li><Link to="/Timetable">Расписание</Link></li>
              <li><Link to="/Calendar">Календарь</Link></li>
              <li><Link to="/Manager">Менеджер кабинетов</Link></li>
              <li><Link to="/Request">Запросы</Link></li>
            </ul>
          </div>
        </div>
      </div>

          <div className="Top">
            <div className="HGroup">
              <h2>{group}</h2>
              <h2>2 семестр 2018-2019г.</h2>
              <h3 id="date">{this.state.date} - 1 неделя</h3>
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
            </div>
          </div>
          <Route exact path="/Timetable" component={Timetable}/>
          <Route exact path="/Calendar" component={this.Calendar}/>
          <Route exact path="/Manager" component={this.Manager}/>
          <Route exact path="/Request" component={this.Request}/>
        </Router>
      </div>
    );
  }
}
export default SearchGroup;
