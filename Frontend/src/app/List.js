import React, { Component,View } from 'react';
import search_img from './Поиск.png';
import './main.css';

class List extends Component{
  render() {
    var cols =[];
    var col = cols.map((co) =>
      <tr>
        {co}
      </tr>);
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
        <div className="top">
          <div className="chek">
            <input className="search_Form" type="text" placeholder="Поиск..." size="60"  />
            <input className="search_Submit"  type="submit" value='Поиск ' />
          </div>
          <div className="CheckBoxs">
            <input type="CheckBox" id="checkSienc" /><label for="checkSienc">Наука</label>
            <input type="CheckBox" id="checkKul" /><label for="checkKul">Культура</label>
            <input type="CheckBox" id="checkSport" /><label for="checkSport">Спорт</label>
          </div>
        </div>
      </div>
    );
  }
}
export default List;
