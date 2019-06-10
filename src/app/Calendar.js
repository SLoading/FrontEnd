import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import Manager from './Manager'
import Request from './Request'
import Timetable from './Schedule'
class Calendar extends Component{
 Calendar = () =>(
  <div>
    <h2>В разработке</h2>
    <Link to="/Timetable">Вернуться</Link>
  </div>
)
   render() {
     return(
       <div className="container">
         <Router>
           <div className="nav">
             <div className="Up">
               <div className="logo_nav">
                   <img src="./favicon.png" />
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
           <Route exact path="/Timetable" component={Timetable}/>
           <Route exact path="/Calendar" component={this.Calendar}/>
           <Route exact path="/Manager" component={Manager}/>
           <Route exact path="/Request" component={Request}/>
         </Router>
       </div>
     );
   }
 }
export default Calendar;
