import * as types from '../constants/CatalogConst'

export function startLoad(data) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_LOAD_START,
      data
    })

    fetch("http://smktesting.herokuapp.com/api/products/?format=json")  
      .then(function(response) { return response.json() })
      .then((something) => {  
        let newArray = something.map(function(item) {
          let newItem = item;
          newItem.img = "http://smktesting.herokuapp.com/static/" + item.img;
          dispatch({
            type: types.DATA_LOAD_SUCCESS,            
            productList: newItem
          });
        });            
      }).catch(function(error) {
        console.info(error);
    });
  }
}

export function unmount() {
  return {
    type: types.DATA_LOAD_DELETE    
  }
}

export function displayData(data) {
  return {
    type: types.DATA_DISPLAY_PRODUCT,
    data
  }
}
