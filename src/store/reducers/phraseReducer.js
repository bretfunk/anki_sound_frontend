//return { ...state, articles: [...state.articles, action.payload]
import {
  SUBMIT_PHRASE,
  RESET_SAVED_PHRASES,
  REMOVE_FROM_STATE,
  ADD_TO_STATE,
  RESET_STATE
} from '../constants/action-types';

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
    case REMOVE_FROM_STATE:
      return {
        dbPhrases: this.props.dbPhrases.filter(function(phrase) {
          return phrase.phrase !== action.phrase
        })
      }
    case ADD_TO_STATE:
      return {
        ...state, dbPhrases: [...state.dbPhrases, action.phrase]
      }
    case RESET_STATE:
      return {
        dbPhrases: []
      }
    default:
      return state;
  }
}
