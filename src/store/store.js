import { createStore } from 'redux';
import rootReducer from './rootReducer';

const ankiSoundDefaultState = {
  heading: {
    loggedIn: false,
    tryingToLogin: false,
    tryingToCreateUser: false
  }
}

const store = createStore(rootReducer, ankiSoundDefaultState);

export default store;
