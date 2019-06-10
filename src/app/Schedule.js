import React, { Component,View } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
//import SearchGroup from './SearchGroup'
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import { setVisibilityFilter } from '../action/index'
import SearchGroup from './SearchGroup'
import { connect } from 'react-redux';
import { createStore } from 'redux';
import { add } from '../action/index'
import axios  from 'axios';

import rootReducer from '../reducer/rootReducer'
  let InputSearch = ''

class Schedule extends Component{
  constructor(props) {
      super(props);
  }

  onSearchChange(event){
    InputSearch = document.getElementById("search_Form").value
    console.log(InputSearch)
  }


Calendar = () =>(
 <div>
   <h2>В разработке</h2>
   <Link to="/Timetable">Вернуться</Link>
 </div>
)

Timetable = () =>(
    <div className="Search">
      <h2>РАСПИСАНИЕ</h2>
      <form onSubmit={this.handleClick}>
        <input id="search_Form" type="text"  onChange={this.onSearchChange} placeholder="Поиск..."  />
        <input className="search_Submit"  type="submit" value='Поиск ' onClick={this.handleClick}/>
      </form>
    </div>
)
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
handleClick = () =>{
  this.props.getList(InputSearch)
  this.props.history.push('/Timetable/group')
}
  render() {
    return(
      <div className="container">
        <Router>
          <div className="nav">
            <div className="Up">
              <div className="logo_nav">
                  <Link to="/Timetable"><img src="../favicon.png" /></Link>
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
          <Route exact  path="/Timetable" component={this.Timetable}/>
          <Route exact path="/Timetable/group" component={SearchGroup}/>
          <Route exact path="/Calendar" component={this.Calendar}/>
          <Route exact path="/Manager" component={this.Manager}/>
          <Route exact path="/Request" component={this.Request}/>
        </Router>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    getList: (group) => { dispatch({type: 'ADD_POST', group: InputSearch})}
  }
}

export default connect(null, mapDispatchToProps)(Schedule);
