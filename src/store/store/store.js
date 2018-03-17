import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const ankiSoundDefaultState = {
  heading: {
    loggedIn: false,
    tryingToLogin: false,
    tryingToCreateUser: false
  },
  login: {
    jwt: '',
    userId: '',
  },
  phrase: {
    savedPhrases: [],
    dbPhrases: []
  },
  random: {
    languageHash: {
      Afrikaans: "af",
      Albanian: "sq",
      Arabic: "ar",
      Armenian: "hy",
      Bosnian: "bs",
      Catalan: "ca",
      Chinese: "zh-CN",
      Croatian: "hr",
      Czech: "cs",
      Danish: "da",
      Dutch: "nl",
      English: "en",
      Esperanto: "eo",
      Finnish: "fi",
      French: "fr",
      German: "de",
      Greek: "el",
      Hindi: "hi",
      Hungarian: "hu",
      Icelandic: "is",
      Indonesian: "id",
      Italian: "it",
      Japanese: "ja",
      Korean: "ko",
      Latin: "la",
      Norwegian: "no",
      Polish: "pl",
      Portugese: "pt",
      Romanian: "ro",
      Russian: "ru",
      Serbian: "sr",
      Slovak: "sk",
      Spanish: "es",
      Swahili: "sw",
      Swedish: "sv",
      Tamil: "ta",
      Thai: "th",
      Turkish: "tr",
      Vietnamese: "vi",
    }
  }
}

const store = createStore(rootReducer, ankiSoundDefaultState, applyMiddleware(thunk));

export default store;
