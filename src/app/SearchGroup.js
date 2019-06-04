import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import Timetable from "./Schedule"
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import axios  from 'axios';
import Store from './Store'
const history = createBrowserHistory();
const groupName = ""
const store = new  Store()
const G = store.value

class SearchGroup extends Component{

  constructor(props){
   super(props);
   this.goBack = this.goBack.bind(this); // i think you are missing this
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
    <div className="Top">
      <div className="HGroup">
        <h2>{G}</h2>
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
  )
  render() {
    console.log("G = " + G)
    console.log(Timetable.getInpSearch)
    let today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
      this.state = {
        date: date
      };
      // console.log("ad " + groupName)
      // axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName:group} })
      //   .then(res => {
      //     groupName = res.data.group
      //     group = groupName
      //     console.log(groupName)
      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
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
      <Route exact path="/Timetable/group" component={this.Tab}/>
      <Route exact path="/Timetable" component={Timetable}/>
      <Route exact path="/Calendar" component={this.Calendar}/>
      <Route exact path="/Manager" component={this.Manager}/>
      <Route exact path="/Request" component={this.Request}/>
    </div>
  </Router>
    );
  }
}
export default SearchGroup;
