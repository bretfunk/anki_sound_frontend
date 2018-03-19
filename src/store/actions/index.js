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

const changeLoggedIn = () => ({ type: CHANGE_LOGGED_IN })
const loggingIn = () => ({ type: CHANGE_TRYING_TO_LOGIN })
const creatingUser = () => ({ type: CHANGE_TRYING_TO_CREATE_USER })
const setJwt = (jwt) => ({ type: SET_JWT, jwt })
const resetJwt = () => ({ type: RESET_JWT })
const setId = (userId) => ({ type: SET_ID, userId })
const resetId = () => ({ type: RESET_ID })
const submitPhrase = (phrase) => ({ type: SUBMIT_PHRASE, phrase })
const resetSavedPhrases = () => ({ type: RESET_SAVED_PHRASES })
const removeFromState = (phrase) => ({ type: REMOVE_FROM_STATE, phrase })
const addToState = (phrase) => ({ type: ADD_TO_STATE, phrase })
const resetState = () => ({ type: RESET_STATE })

export {
  changeLoggedIn,
  loggingIn,
  creatingUser,
  setJwt,
  resetJwt,
  setId,
  resetId,
  submitPhrase,
  resetSavedPhrases,
  removeFromState,
  addToState,
  resetState
}
