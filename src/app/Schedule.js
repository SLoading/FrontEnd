import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter,NavLink, Route, Link, Redirect,Switch} from 'react-router-dom'
//import SearchGroup from './SearchGroup'
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import SearchGroup from './SearchGroup'
import Search from './SearchGroup'
import { connect } from 'react-redux'
import axios  from 'axios';
import Store from './Store';
let n = -1;
let t = -1;
let InputSearch = " "

class Schedule extends Component{
  constructor(props) {
      super(props);
      this.state = {
        InputSearch: ''}
  }

  onSearchChange(event){
    InputSearch = document.getElementById("search_Form").value;

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

handleCLick = () => {
  this.props.addPost(this.props.InputSearch)
 this.props.history.push(`/Timetable/group/${InputSearch}`)
}


Timetable = () =>(
    <div className="Search">
      <h2>РАСПИСАНИЕ</h2>
      <form onSubmit={this.handleCLick}>
        <input id="search_Form" type="text"  onChange={this.onSearchChange} placeholder="Поиск..."  />
        <input className="search_Submit"  type="submit" value='Поиск '/>
      </form>
    </div>
)

  render() {
    return(
      <div className="container">
        <Router>
          <div className="nav">
            <div className="Up">
              <div className="logo_nav">
                  <Link to="/Timetable/Search"><img src="../favicon.png" /></Link>
              </div>
              <div className="nav_menu">
                <ul>
                  <li><Link to="/Timetable/Search">Расписание</Link></li>
                  <li>Календарь</li>
                  <li>Менеджер кабинетов</li>
                  <li>Запросы</li>
                </ul>
              </div>
            </div>
          </div>
          <Route  path="/Timetable/Search" component={this.Timetable}/>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addPost: (group) => { dispatch( {type: 'ADD_POST', group:InputSearch} ) }
  }
}

export default connect(null,mapDispatchToProps)(Schedule);
