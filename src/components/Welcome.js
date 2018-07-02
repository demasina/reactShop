import React from 'react'
import { render } from 'react-dom'
import { logout } from '../actions/loginAction'

import style from './Welcome.less'

export default class Welcome extends React.Component {

  doExit = (event) => {
    event.preventDefault();    
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div className="hello-place text-right">
        <span>Hello, {this.props.username}!</span><br />
        <button 
          type="submit" 
          className="btn btn-exit"
          onClick={this.doExit}
        >
        EXIT</button>
      </div>
    )
  }
}