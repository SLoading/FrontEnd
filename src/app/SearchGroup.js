import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import Timetable from "./Schedule"
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import axios  from 'axios';
import rootReducer from '../reducer/rootReducer'
import { connect } from 'react-redux';
const history = createBrowserHistory();
let groups = [ ]
let timetable = [ ]

// function getTimeTableReq(){
//    axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName: groups} })
//      .then(res => {
//          return res
//      })
//      .catch(err => {
//        return err
//      })
//  }
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
//  {*/let time = []
//   let dis = []
//    let day = this.props.groupNumber.fweek.map((user) => {
//     return <div>{user}</div>;
// });*/}
// GroupSchedule = () =>(
//
// )

datNumber(){
  let today = new Date(),
    Dat = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    this.dat = {
      date: Dat
    };
    return this.dat.date
}

  NumberWeek(){
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0 , 4)
    return (Math.round(((date.getTime() - week1.getTime()) / 86400000 -7 +(week1.getDay() + 6) % 7 ) / 7)) % 10
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
TableSchedule(props) {
  const wek = this.props.groupNumber.group
  console.log(wek)
}
 Tab = this.props.groupNumber ? (
    <div>
      <div className="Top">
        <div className="HGroup">
          <h2 className="htop">{this.props.groupNumber.group}</h2>
          <h2>2 семестр 2018-2019г.</h2>
          <h4 id="date">{this.datNumber()} - {this.NumberWeek()} неделя</h4>
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
          {this.TableSchedule}
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
    </div>
  ) :
  (
    <div className="Top">
      <h1>Not found</h1>
    </div>
  )

  render() {
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
      {this.Tab}

    </div>
  </Router>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let groupName = ownProps.match.params.group
  groups =   state.Timetable
  // timetable = getTimeTableReq()
  return{
    groupNumber: state.Timetable
  };
}
export default connect(mapStateToProps, null)(SearchGroup);
