import * as types from '../constants/loginConst'

const initialState = {
  username: "User",
  isRegBegin: false,
  isRegSuccess: false,
  errorMessage: "",
  isLogRegError: false,  
  isLogin: false,
  token: ""
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.REG_START: {
      return {... state, isRegBegin: action.data.stateLogin}      
    }
    case types.REG_START_SUCCESS: {
      return {... state, isLogRegError: false, isRegBegin: false, isLogin: true, username: action.user, token: action.json.token }      
    }
    case types.REG_START_ERROR: {  
      return {... state, isLogRegError: true, errorMessage: action.json.message}      
    }   
    case types.LOGIN_START: {
      return {... state, isRegBegin: action.data.stateLogin}      
    }
    case types.LOGIN_START_SUCCESS: {
      return {... state, isLogRegError: false, isLogin: true, username: action.user, token: action.json.token }      
    }   
    case types.LOGIN_START_ERROR: {
      return {... state, isLoginError: true, isLogRegError: true, errorMessage: action.json.message}      
    }    
    case types.LOGOUT: {
      return {... state, isLogin: false, username: "", token: ""}      
    }         
    default:
      return state;
  }
}