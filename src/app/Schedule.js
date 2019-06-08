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
import getList from './getProjectList'
import axios  from 'axios';
import Store from './Store';
function updateState(state){
  return { InputSearch: state.InputSearch }
  }
  let InputSearch = ''

class Schedule extends Component{
  constructor(props) {
      super(props);
      this.Search= this.Search.bind(this);
  }

  getInpSearch(){
    return InputSearch
  }

  onSearchChange(event){
    InputSearch = document.getElementById("search_Form").value

    console.log(InputSearch)
  }
  Search(e){
    e.preventDefault()
    console.log("Privet")
    const group = InputSearch
    getList(group)
    InputSearch = ""}


Calendar = () =>(
 <div>
   <h2>В разработке</h2>
   <Link to="/Timetable">Вернуться</Link>
 </div>
)

Timetable = () =>(
  <Router>
    <div className="Search">
      <h2>РАСПИСАНИЕ</h2>
      <form onSubmit={this.Search}>
        <input id="search_Form" type="text"  onChange={this.onSearchChange} placeholder="Поиск..." ref={node =>(InputSearch = node)}  />
        <Link to={this.Search}><input className="search_Submit"  type="submit" value='Поиск '/></Link>
      </form>
    </div>
    <Route exact path="/Timetable/group" component={this.TitleH}/>
  </Router>
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
          <Route exact path="/Timetable/group" component={this.Search}/>
          <Route exact path="/Calendar" component={this.Calendar}/>
          <Route exact path="/Manager" component={this.Manager}/>
          <Route exact path="/Request" component={this.Request}/>
        </Router>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getList:(params) => dispatch(getList(params))
})

export default connect(mapDispatchToProps)(Schedule);
