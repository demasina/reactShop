import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { loginStart, regStart } from '../actions/loginAction'

import style from './Login.less'

class Login extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
          username: "",
          password: ""
    };
  } 


  handleNameChange = (event) => {
    this.setState({username: event.target.value});
  };

  handlePassChange = (event) => {
    this.setState({password: event.target.value});
  };

  doLogin = (event) => {
    event.preventDefault();

    if (this.state.username.trim().length === 0 || this.state.password.trim().length === 0 ) {
      alert("Поля не могут быть пустыми. Введите логин и пароль");
      return;
    }

    let stateReg = !this.props.beginLogin,
        username = this.state.username,
        password = this.state.password,
        data = { stateReg, username, password } ;
    this.props.dispatch(loginStart(data))
  };

  doRegistration = (event) => {
    event.preventDefault();

    if (this.state.username.trim().length === 0 || this.state.password.trim().length === 0 ) {
      alert("Поля не могут быть пустыми. Введите логин и пароль");
      return;
    }
    if (this.state.password.trim().length < 6 ) {
      alert("Password should contain at least 6 symbols");
      return;
    }
    
    let stateReg = !this.props.beginLogin,
        username = this.state.username,
        password = this.state.password,
        data = { stateReg, username, password };
    this.props.dispatch(regStart(data))
  };

  render() {
    let stateReg = this.props.beginLogin,
        errorRegState = this.props.errorRegState

    return (
      <div className="login-place">
        <form className="form-horizontal">
          <div className="form-group">        
            <label htmlFor="nameInput" className="col-sm-3 control-label">Name</label>
            <div className="col-sm-9">
              <input 
                type="text" 
                className="form-control" 
                disabled={ (stateReg) ? "disabled" : ""}
                id="nameInput" 
                placeholder="Name" 
                maxLength="30"
                onChange={this.handleNameChange}
                required="required"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="col-sm-3 control-label">Password</label>
            <div className="col-sm-9">
              <input 
                type="password" 
                className="form-control" 
                disabled={ (stateReg) ? "disabled" : ""}
                id="inputPassword" 
                placeholder="Password" 
                onChange={this.handlePassChange}
              />
            </div>
          </div>
          <div className="form-group button-place">
            <div className="col-sm-offset-3 col-sm-9">
              <button 
                type="submit" 
                className="btn btn-log"
                onClick={this.doLogin}
                disabled={ (stateReg) ? "disabled" : ""}
              >

              Log In</button>
              <button 
                type="submit" 
                className="btn button-reg"
                onClick={this.doRegistration}
                disabled={ (stateReg) ? "disabled" : ""}
              >
              Sign Up</button>
            </div>
          </div>  
        </form>  
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    beginLogin: state.login.isRegBegin,
    errorRegMessage: state.login.errorMessage
  }
}

export default connect(mapStateToProps)(Login)