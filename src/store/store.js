import { createStore } from 'redux';
import rootReducer from './rootReducer';

const ankiSoundDefaultState = {
  heading: {
    loggedIn: false
  }
}

const store = createStore(rootReducer, ankiSoundDefaultState);

export default store;
