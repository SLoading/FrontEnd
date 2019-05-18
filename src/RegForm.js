import React,{ Component } from 'react';

class RegForm extends Component {
constructor(props) {
    super(props);
    this.state = {value: '',pasw: ''};

    this.onPasswChange = this.onPasswChange.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onLoginChange(event){
    this.setState({value: event.target.value});
  }

  onPasswChange(event){
    this.setState({pasw: event.target.value});
  }
  handleSubmit(event){
    alert('A name this: ' + this.state.value + ' ' + this.state.pasw );
    event.parentDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img className="image_logo" src="/logo.png" alt="Error"/>
          <form onSubmit={this.handleSubmit} method="post" action="/login">
            <label className="logName">
              <b>Login:</b>
              <input type="text" name="login" value={this.state.value} onChange={this.onLoginChange} />
            </label>
            <br/>
            <label className="pass">
              <b>Password:</b>
              <input type="password" name="password" value={this.state.pasw} onChange={this.onPasswChange}/>
            </label>
            <br/>
              <a href='#' className="dKnow_pass">Forgot password?</a>
            <br/>
            <input className="btnAut" type="submit" value="Log in" />
          </form>
        </header>
      </div>
    );
  }
}

export default RegForm;
