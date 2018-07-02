import * as types from '../constants/CatalogConst'

const initialState = {
  isFetching: false,
  productList: [],  
  productDisplay: [],
};

export default function dataReducer(state = initialState, action) {  
  switch (action.type) {
    case types.DATA_LOAD_START: {      
      return {... state, isFetching: action.data}
    }
    case types.DATA_LOAD_SUCCESS: {
      let test = action.productList;
      return {... state, productList: state.productList.concat(test) }     
    }
    case types.DATA_LOAD_DELETE: {
      return {... state, productList: [] }     
    }
    case types.DATA_LOAD_ERROR: {
      return {... state }     
    }
    case types.DATA_DISPLAY_PRODUCT: {
      return {... state, productDisplay: action.data}     
    }
    default:
      return state;
  }
}