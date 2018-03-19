import {
  CHANGE_LOGGED_IN,
  CHANGE_TRYING_TO_LOGIN,
  CHANGE_TRYING_TO_CREATE_USER,
  SET_JWT,
  RESET_JWT,
  SET_ID,
  RESET_ID,
  SUBMIT_PHRASE,
  RESET_SAVED_PHRASES,
  REMOVE_FROM_STATE,
  ADD_TO_STATE,
  RESET_STATE
} from '../constants/action-types'

export const changeLoggedIn = () => ({ type: CHANGE_LOGGED_IN })
export const loggingIn = () => ({ type: CHANGE_TRYING_TO_LOGIN })
export const creatingUser = () => ({ type: CHANGE_TRYING_TO_CREATE_USER })
export const setJwt = (jwt) => ({ type: SET_JWT, jwt })
export const resetJwt = () => ({ type: RESET_JWT })
export const setId = (userId) => ({ type: SET_ID, userId })
export const resetId = () => ({ type: RESET_ID })
export const submitPhrase = (phrase) => ({ type: SUBMIT_PHRASE, phrase })
export const resetSavedPhrases = () => ({ type: RESET_SAVED_PHRASES })
export const removeFromState = (phrase) => ({ type: REMOVE_FROM_STATE, phrase })
export const addToState = (phrase) => ({ type: ADD_TO_STATE, phrase })
export const resetState = () => ({ type: RESET_STATE })
