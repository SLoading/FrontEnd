import React, { Component,View } from 'react'
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
//import SearchGroup from './SearchGroup'
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
import SearchGroup from './SearchGroup'
import axios  from 'axios';
import Store from './Store';
let n = -1;
let t = -1;
let InputSearch = { count : "" };
function updateState(state){
  return  { count : state.count };
}
const store = new Store(updateState,InputSearch);



class Schedule extends Component{
  constructor(props) {
      super(props);
      this.Search= this.Search.bind(this);
  }
componentDidMount() {
  store.subscribe(() => this.forceUpdate());
}

  // weekClick(){
  //   if (document.getElementById('weekN').textContent == "1 неделя")
  //     document.getElementById('weekN').innerHTML = '2 неделя'
  //
  //   else
  //     document.getElementById('weekN').innerHTML = '1 неделя'
  //   return(document.getElementById('weekN').textContent)
  //
  // }
  getInpSearch(){
    return InputSearch
  }

  onSearchChange(event){
    InputSearch.count = document.getElementById("search_Form").value;
    store.update(InputSearch);
  }
  Search(e){
    e.preventDefault()
    let group = store.value.count;
    axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName:group} })
      .then(res => {
        this.props.history.push('/Timetable/group')
      })
      .catch(err=>{
        console.log(err);
      });
  }


//   Count_T(){
//     t = t + 1
//       return t
//   }
//   NumberWeek(){
//     let date = new Date()
//     let week1 = new Date(date.getFullYear(), 0 , 4)
//     return (1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 -3 +(week1.getDay() + 6) % 7 ) / 7)) % 10
//   }
//
//
//   GroupSchedule(sched){
//     n = n + 1
//     let time = []
//     let dis = []
//       time = sched.map((user) => {
//       return <div>{user.time}</div>;
//     });
//      dis = sched.map((user) => {
//     return <div>{user.class}</div>});
//
//     const day = sched.map((user) => {
//     return <div>{user.day}</div>;
// });
// return (
//   <div className="items">
//     <div className="head_table">
//       <h4 id="Name_day">{day}</h4>
//     </div>
//     <div className="body_table">
//       <div className="left_col">
//         <h5>Время</h5>
//         <div className="time">
//           <div>{time}</div>
//         </div>
//       </div>
//       <div className="right_col">
//         <h5>Дисциплина</h5>
//           <div>{dis}</div>
//           <div className="Teacher">Черкасова</div>
//           <div className="Rooms">корп ГЛ 412</div>
//       </div>
//     </div>
//   </div>
// )
// }
TitleH = () =>(
    <div className="Top">
      <div className="HGroup">
        <h2>Group</h2>
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
        <input id="search_Form" type="text"  onChange={this.onSearchChange} placeholder="Поиск..."  />
        <Link onClick={this.Search}><input className="search_Submit"  type="submit" value='Поиск '/></Link>
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
export default Schedule;
