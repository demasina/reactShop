import * as types from '../constants/ProductConst'

export function startLoadReview(data) {
  return (dispatch) => {
    dispatch({
      type: types.PRODUCT_LOAD_START,
    })

    let newData = JSON.parse(localStorage.getItem("product")),
        dataID = newData.id,
        dataIDForFetch;

    if (data == undefined) {
      dataIDForFetch = dataID;
    } else {
      dataIDForFetch = data;
    }

    fetch("http://smktesting.herokuapp.com/api/reviews/" + dataIDForFetch)  
      .then(function(response) { return response.json() })
      .then((review) => {  
          dispatch({
            type: types.PRODUCT_LOAD_SUCCESS,            
            review
          });
      }).catch(function(error) {
        console.info(error);
    });
  }
}

export function unmount() {
  return {
    type: types.PRODUCT_LOAD_DELETE    
  }
}

export function addReview(data) {
  return (dispatch) => {
    dispatch({
      type: types.PRODUCT_REVIEW_ADD_START
    })

    let newData = JSON.parse(localStorage.getItem("product")),
        dataID = newData.id,
        dataIDForFetch;

    if (data.idProduct == undefined) {
      dataIDForFetch = dataID;
    } else {
      dataIDForFetch = data.idProduct;
    }

    fetch('http://smktesting.herokuapp.com/api/reviews/' + dataIDForFetch, {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + data.token,
        'Accept': '*/*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        "rate": data.rate, 
        "text": data.comment
      })
    }).then(function (response) {
      return response.json();
    }).then(function(json) {
      if (json.success) {
        dispatch({
          type: types.PRODUCT_REVIEW_ADD_SUCCESS,
          json  
        });        
      } else {
        dispatch({
          type: types.PRODUCT_REVIEW_ADD_ERROR,
        })        
      }      
    }).catch(function(error) {
      
    });

  }
}