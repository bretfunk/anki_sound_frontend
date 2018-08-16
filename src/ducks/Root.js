import { headingReducer } from "./Heading";
import { loginReducer } from "./Login";
import { phraseReducer } from "./Phrase";
import { randomReducer } from "./Random";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  heading: headingReducer,
  random: randomReducer,
  login: loginReducer,
  phrase: phraseReducer
});

export default rootReducer;
