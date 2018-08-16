import { defaultState } from "../State";

const KEYS = {
  SUBMIT_PHRASE: "SUBMIT_PHRASE",
  RESET_SAVED_PHRASES: "RESET_SAVED_PHRASES",
  REMOVE_FROM_STATE: "REMOVE_FROM_STATE",
  ADD_TO_STATE: "ADD_TO_STATE",
  RESET_STATE: "RESET_STATE",
  DISABLE_LOADING: "DISABLE_LOADING"
};

export const submitPhrase = phrase => ({ type: KEYS.SUBMIT_PHRASE, phrase });
export const resetSavedPhrases = () => ({ type: KEYS.RESET_SAVED_PHRASES });
export const removeFromState = phrase => ({
  type: KEYS.REMOVE_FROM_STATE,
  phrase
});
export const addToState = phrase => ({ type: KEYS.ADD_TO_STATE, phrase });
export const resetState = () => ({ type: KEYS.RESET_STATE });
export const disableLoading = i => ({ type: KEYS.DISABLE_LOADING, i });

export function phraseReducer(state = defaultState, action) {
  switch (action.type) {
    case KEYS.SUBMIT_PHRASE:
      return {
        ...state,
        savedPhrases: [...state.savedPhrases, action.phrase]
      };
    case KEYS.RESET_SAVED_PHRASES:
      return {
        ...state,
        savedPhrases: []
      };
    case KEYS.REMOVE_FROM_STATE:
      return {
        ...state,
        dbPhrases: state.dbPhrases.filter(
          ({ phrase }) => phrase !== action.phrase.phrase
        )
      };
    case KEYS.ADD_TO_STATE:
      return {
        ...state,
        dbPhrases: [...state.dbPhrases, action.phrase]
      };
    case KEYS.RESET_STATE:
      return {
        ...state,
        dbPhrases: []
      };
    case KEYS.DISABLE_LOADING: {
      const i = action.i;
      let updatedPhrases = [...state.savedPhrases];
      updatedPhrases[i].loading = false;
      return {
        ...state,
        savedPhrases: updatedPhrases
      };
    }
    default:
      return state;
  }
}
