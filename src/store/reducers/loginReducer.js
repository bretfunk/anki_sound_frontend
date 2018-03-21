import { SET_JWT, RESET_JWT, SET_ID, RESET_ID } from '../constants/action-types';

export function loginReducer(state = {}, action) {
  switch(action.type) {
    case SET_JWT:
      return {
        ...state, jwt: action.jwt
      }
    case RESET_JWT:
      return  {
        ...state, jwt: ''
      }
    case SET_ID:
      return {
        ...state, userId: action.userId
      }
    case RESET_ID:
      return {
        ...state, userId: ''
      }
    default:
      return state;
  }
}
