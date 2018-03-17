//return { ...state, articles: [...state.articles, action.payload]
import { SUBMIT_PHRASE, RESET_SAVED_PHRASES } from '../constants/action-types';
export function phraseReducer(state = {}, action) {
  switch(action.type) {
    case SUBMIT_PHRASE:
      return {
        ...state, savedPhrases: [...state.savedPhrases, action.phrase]
      }
    case RESET_SAVED_PHRASES:
      return {
        savedPhrases: []
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

