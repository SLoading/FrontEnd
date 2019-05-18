import React, { Component,View } from 'react';
import './main.css';

class spiski extends Component{
  weekClick(){
    if (document.getElementById('weekN').textContent == "1 неделя")
      document.getElementById('weekN').innerHTML = '2 неделя'
    else
      document.getElementById('weekN').innerHTML = '1 неделя'

  }


  render() {
    var weeks =[['-'],['-'],['-'],['-'],['-'],['-'],['-']];
    var wek = weeks.map((we) =>
      <td>{we}</td>);
    const time = ['08:00', '09:40', '11:30', '13:30', '15:15', '17:05','18:20'];
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
            <table>
              <tr>
                {day.map(item =>
                  <tr>
                    <td>
                      <th colspan="2">
                        {item}
                      </th>
                      <tr>
                        <td>Время</td>
                        <td>Дисциплина</td>
                      </tr>
                      <tr>
                        <td>
                          {time.map(item => <tr><td>{item}</td></tr>)}
                        </td>
                        <td>
                          {wek.map(item => <tr>{item}</tr>)}
                        </td>
                      </tr>
                    </td>
                  </tr>
                )}
              </tr>
            </table>
          </div>
        </div>

    );
  }
}
export default spiski;
