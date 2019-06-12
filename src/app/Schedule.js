import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
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
  }

  onSearchChange(event){
    InputSearch = document.getElementById("search_Form").value;

  }


handleCLick = () => {
  this.props.addPost(this.props.InputSearch)
  this.props.history.push('/Timetable/group')
}


Timetable = () =>(
    <div className="Search">
      <h2>РАСПИСАНИЕ</h2>
      <form onSubmit={this.Search}>
        <input id="search_Form" type="text"  onChange={this.onSearchChange} placeholder="Поиск..."  />
        <input className="search_Submit"  type="submit" value='Поиск ' onClick={this.handleCLick}/>
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
                  <Link to="/Timetable"><img src="./favicon.png" /></Link>
              </div>
              <div className="nav_menu">
                <ul>
                  <li><Link to="/Timetable">Расписание</Link></li>
                  <li>Календарь</li>
                  <li>Менеджер кабинетов</li>
                  <li>Запросы</li>
                </ul>
              </div>
            </div>
          </div>
          <Route exact  path="/Timetable" component={this.Timetable}/>
          <Route exact path="/Timetable/group" component={Search}/>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addPost: (group) => { dispatch({type: 'ADD_POST',group:InputSearch}) }
  }
}

export default connect(null,mapDispatchToProps)(Schedule);
