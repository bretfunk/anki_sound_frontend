import { SET_JWT, RESET_JWT, SET_ID, RESET_ID } from '../constants/action-types';

export function loginReducer(state = {}, action) {
  switch(action.type) {
    case SET_JWT:
      return {
        jwt: action.jwt
      }
    case RESET_JWT:
      return  {
        jwt: ''
      }
    case SET_ID:
      return {
        userId: action.userId
      }
    case RESET_ID:
      return {
        userId: ''
      }
    default:
      return state;
  }
}
//import {
//CHANGE_LOGGED_IN,
//CHANGE_TRYING_TO_LOGIN,
//CHANGE_TRYING_TO_CREATE_USER
//} from '../constants/action-types';

//export function headingReducer(state = {}, action) {
//switch(action.type) {
//case CHANGE_LOGGED_IN:
//return {
//loggedIn: state.loggedIn ? false : true
//}
//case CHANGE_TRYING_TO_LOGIN:
//return {
//tryingToLogin: state.tryingToLogin ? false : true
//}
//case CHANGE_TRYING_TO_CREATE_USER:
//return {
//tryingToCreateUser: state.tryingToCreateUser ? false : true
//}
//default:
//return state;
//}
//}
