import React,{ Component } from 'react';
import {BrowserRouter as Router, WithRouter, Route, Link, Redirect,Switch} from 'react-router-dom'
import axios  from 'axios';
import Timetable from './Schedule';
class RegForm extends Component {

constructor(props) {
    super(props);
    this.state = {log: '',pass: ''};

    this.onPasswChange = this.onPasswChange.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
  }

  onLoginChange(event){
    this.setState({log: event.target.value});
  }

  onPasswChange(event){
    this.setState({pass: event.target.value});
  }

  Schedule = (e) => {
    e.preventDefault()
    const user = {
      login: this.state.log,
      password : this.state.pass
    };
    console.log()
    axios.post(`http://127.0.0.1:3030/api/login`, { user })
    .then(result =>{
      this.props.history.push('/Timetable')
    }
  )
  .catch(err=>{
    console.log(err);
  })
  }
  render() {
    return (
        <div className="App">
          <header className="App-header">
          <img className="image_logo" src="/logo.png" alt="Error"/>
            <form onSubmit={this.Schedule}>
              <label className="logName">
                <b>Login:</b>
                <input type="text" name="login" value={this.state.log} onChange={this.onLoginChange} />
              </label>
              <br/>
              <label className="pass">
                <b>Password:</b>
                <input type="password" name="password" value={this.state.pass} onChange={this.onPasswChange}/>
              </label>
              <br/>
                <a href='#' className="dKnow_pass">Forgot password?</a>
              <br/>
            <input className="btnAut" type="submit" value="Log in" onClick={this.Schedule}/>
            </form>
          </header>
        </div>
    );
  }
}

export default RegForm;
