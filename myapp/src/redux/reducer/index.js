import loginReducer from './login'
import numberReducer from './number'
import {combineReducers} from 'redux'

// export default (state = {}, ) => {
//     const newState = {
//         login:loginReducer(state.login,action),
//         number:numberReducer(state.number,action)
//     }
//     return newState
// }
export  default combineReducers({
    login:loginReducer,
    number:numberReducer
})