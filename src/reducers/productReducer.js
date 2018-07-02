import * as types from '../constants/ProductConst'

const initialState = {
  isFetching: false, 
  successAdd: false,  
  showReview: []
};

export default function dataReducer(state = initialState, action) {  
  switch (action.type) {
    case types.PRODUCT_LOAD_START: {      
      return {... state, isFetching: true}
    }
    case types.PRODUCT_LOAD_SUCCESS: {
      let data = action.review;
      let newArray = [];    
      return {... state, isFetching: false, successAdd: false, showReview: newArray.concat(data).reverse()}
    }   
    case types.PRODUCT_LOAD_DELETE: {    
      return {... state, showReview: []}
    }
    case types.PRODUCT_REVIEW_ADD_START: {    
      return {... state, successAdd: true}
    }
    case types.PRODUCT_REVIEW_ADD_SUCCESS: {
      return {... state, successAdd: action.json.success}    
    }
    case types.PRODUCT_REVIEW_ADD__ERROR: {    
      return {... state }
    }
    default:
      return state;
  }
}