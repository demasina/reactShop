import * as types from '../constants/loginConst'

export function loginStart(data) {
  return (dispatch) => {
    dispatch({
      type: types.LOGIN_START,
      data
    })

    fetch('http://smktesting.herokuapp.com/api/login/', {
      method: 'POST',
      headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    }).then(function (response) {
      return response.json();
    }).then(function(json) {
      if (json.success) {
        dispatch({
          type: types.LOGIN_START_SUCCESS,
          json,
          user: data.username        
        });        
      } else {
        dispatch({
          type: types.LOGIN_START_ERROR,
          json
        })        
      }      
    }).catch(function(error) {
      console.info(error);
    });

  }
}

export function regStart(data) {
  return (dispatch) => {
    dispatch({
      type: types.REG_START,
      data
    })

    fetch('http://smktesting.herokuapp.com/api/register/', {
      method: 'POST',
      headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        username: data.username,
        password: data.password
    })
    }).then(function (response) {
      return response.json();
    }).then(function(json) {
      if (json.success) {
        dispatch({
          type: types.REG_START_SUCCESS,
          json,
          user: data.username 
        });
      } else {
        dispatch({
          type: types.REG_START_ERROR,
          json
        })
      }      
      // document.cookie = "token = json.token; mag-age=86400"; //Save token 1 day      
    }).catch(function(error) {
      console.info(error);
    });
  };  
}

export function logout() {
  return {
    type: types.LOGOUT
  }
}