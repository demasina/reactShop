import { combineReducers } from 'redux'
import dataReducer from './dataReducer'
import loginReducer from './loginReducer'
import productReducer from './productReducer'

export default combineReducers({
  data: dataReducer,
  login: loginReducer,
  product: productReducer
});