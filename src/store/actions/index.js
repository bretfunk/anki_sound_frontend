import {
  CHANGE_LOGGED_IN,
  CHANGE_TRYING_TO_LOGIN,
  CHANGE_TRYING_TO_CREATE_USER
} from '../constants/action-types'

export const changeLoggedIn = () => ({ type: CHANGE_LOGGED_IN })
export const loggingIn = () => ({ type: CHANGE_TRYING_TO_LOGIN })
export const creatingUser = () => ({ type: CHANGE_TRYING_TO_CREATE_USER })
