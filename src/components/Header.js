import React from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import Login from '../components/Login'
import Welcome from '../components/Welcome'
import NavLink from '../components/NavLink'

import style from './Header.less'

class Header extends React.Component {

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 header">

        <div className="col-xs-4 col-sm-4 col-md-7 menu-bar"> 
          <nav>
            <ul className='nav nav-pills'>
              <li className="btn-prod"><NavLink to='/catalog'>Products</NavLink></li>
            </ul>
          </nav>
        </div>
        <div className="col-xs-8 col-sm-offset-1 col-sm-6 col-md-4 col-md-offset-0">  
          {
            (this.props.isLogin) ? <Welcome username={this.props.username} dispatch={this.props.dispatch} /> : <Login />           
          }    
        </div>        
        {
          (this.props.errorRegState) ? 
            <div className="error-message">{this.props.errorRegMessage}</div> : 
            <div></div>
        }        
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    username: state.login.username,
    isLogin: state.login.isLogin,
    errorRegMessage: state.login.errorMessage,    
    errorRegState: state.login.isLogRegError
  }
}

export default connect(mapStateToProps)(Header)