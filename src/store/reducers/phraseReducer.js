import {
  SUBMIT_PHRASE,
  RESET_SAVED_PHRASES,
  REMOVE_FROM_STATE,
  ADD_TO_STATE,
  RESET_STATE
} from '../constants/action-types';

const defaultState = {
savedPhrases: [],
dbPhrases: []
}

export function phraseReducer(state = defaultState, action) {
  switch(action.type) {
    case SUBMIT_PHRASE:
      return {
        ...state, savedPhrases: [...state.savedPhrases, action.phrase]
      }
    case RESET_SAVED_PHRASES:
      return {
        ...state, savedPhrases: []
      }
    case REMOVE_FROM_STATE:
      return {
        ...state, dbPhrases: state.dbPhrases.filter(({ phrase }) => phrase !== action.phrase )
      }
    case ADD_TO_STATE:
      return {
        ...state, dbPhrases: [...state.dbPhrases, action.phrase]
      }
    case RESET_STATE:
      return {
        ...state, dbPhrases: []
      }
    default:
      return state;
  }
}
