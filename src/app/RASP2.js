import React, { Component,View } from 'react';
import '../style/main.css';
import '../style/table.css';
var n = -1;
var t = -1;
class RASP2 extends Component{
  weekClick(){
    if (document.getElementById('weekN').textContent == "1 неделя")
      document.getElementById('weekN').innerHTML = '2 неделя'
    else
      document.getElementById('weekN').innerHTML = '1 неделя'

  }
  Time_day(){
    t = t + 1
    let time = [
      ['08:00-09:30','09:40-11:10','11:30-13:00'],
      ['09:40-11:10','11:30-13:00','13:30-15:00'],
      ['11:30-13:00','13:30-15:00'],
      ['13:30-15:00'],
      [],
      ['15:10-16:40','16:50-18:20']];
      return time[t]
  }
  Disc_day(){
      n = n + 1
    let disp = [
      ['fizra','- ','bzd'],
      ['log','bd','bd'],
      ['log','bd'],
      ['web'],
      [],
      ['oop','oop']];
      return disp[n]
      }

  render() {
    const day = ['Понедельник', 'Вторник', 'Среда', 'Четрвег', 'Пятница', 'Суббота'];
    var today = new Date(),
      date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() + " \n" + today.getDay();
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
          <h1 id="date">{this.state.date}</h1>
          <div className="tabl">
            <div className="week">
              <div className="arrow_week">
                <a href='#' onClick={(e) => this.weekClick(e)}>&lt;</a>
                <p id="weekN">1 неделя</p>
                <a href='#' onClick={(e) => this.weekClick(e)}>&gt;</a>
              </div>
            </div>
            {day.map((item) =>
            <div className="tablic">
              <div className="head_table">
                <h4 id="Name_day">{item}</h4>
              </div>
              <div className="body_table">
                <div className="left_col">
                  <h5>Время</h5>
                  {this.Time_day().map((item) =>
                  <div className="time">
                    {item}
                  </div>)}
                </div>
                <div className="right_col">
                <h5>Дисциплина</h5>
                {this.Disc_day().map((item) =>
                  <div className="discip">
                    {item}
                  </div>)}
                </div>
              </div>
            </div>)}
          </div>
        </div>
    );
  }
}
export default RASP2;
