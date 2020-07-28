import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import contactReducer from './contactReducer'

export default combineReducers({
    alert : alertReducer,
    auth : authReducer,
    contact : contactReducer
})