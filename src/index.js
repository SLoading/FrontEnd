import React from 'react';

import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import './style/main.css';
import RegForm from './app/RegForm';
import Timetable from './app/Schedule';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducer/rootReducer';
import SearchGroup from './app/SearchGroup'

import * as serviceWorker from './app/serviceWorker';
const history = createBrowserHistory();
const store = createStore(allReducers)
ReactDOM.render(
  <Provider store = {store}>
    <Router history={history} >
      <Route exact path="/" component={RegForm} />
      <Route  path="/Timetable/Search" component={Timetable} />
      <Route path="/Timetable/group/:num" component={SearchGroup} />
    </Router>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
