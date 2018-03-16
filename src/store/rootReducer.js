import { headingReducer } from './headingReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  heading: headingReducer
});

export default rootReducer;
