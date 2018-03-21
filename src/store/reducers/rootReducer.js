import { headingReducer } from './headingReducer';
import { randomReducer } from './randomReducer';
import { loginReducer } from './loginReducer';
import { phraseReducer } from './phraseReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  heading: headingReducer,
  random: randomReducer,
  login: loginReducer,
  phrase: phraseReducer
});

export default rootReducer;
