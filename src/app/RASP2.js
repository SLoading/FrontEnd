import React, { Component,View } from 'react'
import '../style/main.css'
import '../style/table.css'
import '../style/search.css'
var n = -1;
var t = -1;
class RASP2 extends Component{
  weekClick(){
    if (document.getElementById('weekN').textContent == "1 неделя")
      document.getElementById('weekN').innerHTML = '2 неделя'

    else
      document.getElementById('weekN').innerHTML = '1 неделя'
    return(document.getElementById('weekN').textContent)

  }
  inf(){
    const users = [{
        class:"Сетевое",
        group:"16-01",
        time:"09:01-11:50",
        day:"Понедельник",
        week:"chet"
      },
      {
          class:"Yt Сетевое",
          group:"16-01",
          time:"09:01-11:50",
          day:"Понедельник",
          week:"nechet"
        },
        {
            class:" НЕ Сетевое",
            group:"16-01",
            time:"09:01-11:50",
            day:"Вторник",
            week:"chet"
          }];
          return users;
  }
  Count_T(){
    t = t + 1
      return t
  }
  Disc_day(){
    n = n + 1
    const users = this.inf();
    var time = users.map((user) => {
    return <div>{user.time}</div>;
    });
    var dis = users.map((user) => {
  return <div>{user.class}</div>});
    if (document.getElementById('weekN').textContent!=" "){
       time = users.map((user) => {
      return <div>{user.time}</div>;
      });
       dis = users.map((user) => {
      return <div>{user.class}</div>});
    }
    else{
       time = users.map((user) => {
      return <div>{user.time}</div>;
      });
      dis = users.map((user) => {
    return <div>{user.class}</div>});}

    const day = users.map((user) => {
    return <div>{user.day}</div>;
});
return (
  <div className="items">
    <div className="head_table">
      <h4 id="Name_day">{day}</h4>
    </div>
    <div className="body_table">
      <div className="left_col">
        <h5>Время</h5>
        <div className="time">
          <div>{time}</div>
        </div>
      </div>
      <div className="right_col">
        <h5>Дисциплина</h5>
          <div>{dis}</div>
          <div className="Teacher">Черкасова</div>
          <div className="Rooms">корп ГЛ 412</div>
      </div>
    </div>
  </div>
)
}

  render() {
    var today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
      this.state = {
        date: date
      };
    return(
      <div className="container">
        <div className="nav">
          <div className="Up">
            <div className="logo_nav">
                <img src="./favicon.png" />
            </div>
            <div className="nav_menu">
                <a href="#">Расписание</a>
                <a href="#">Календарь</a>
                <a href="#">Менеджер кабинетов</a>
                <a href="#">Запросы</a>
            </div>
          </div>
        </div>
        <div className="Search">
          <form onSubmit={this.handleSubmit} method="post" action="/search">
          <input className="search_Form" type="text" placeholder="Поиск..."  />
          <input className="search_Submit"  type="submit" value='Поиск ' />
          </form>
        </div>
          <div className="HGroup">
          <h2>"БПА16-01"</h2>
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
            <div className="tablic">
              {this.Disc_day()}
            </div>
          </div>
        </div>
    );
  }
}
export default RASP2;
