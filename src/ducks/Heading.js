const KEYS = {
  CHANGE_LOGGED_IN: "CHANGE_LOGGED_IN",
  CHANGE_TRYING_TO_LOGIN: "CHANGE_TRYING_TO_LOGIN",
  CHANGE_TRYING_TO_CREATE_USER: "CHANGE_TRYING_TO_CREATE_USER"
};

export const changeLoggedIn = () => ({ type: KEYS.CHANGE_LOGGED_IN });
export const loggingIn = () => ({ type: KEYS.CHANGE_TRYING_TO_LOGIN });
export const creatingUser = () => ({ type: KEYS.CHANGE_TRYING_TO_CREATE_USER });

export function headingReducer(state = {}, action) {
  switch (action.type) {
    case KEYS.CHANGE_LOGGED_IN:
      return {
        loggedIn: state.loggedIn ? false : true
      };
    case KEYS.CHANGE_TRYING_TO_LOGIN:
      return {
        tryingToLogin: state.tryingToLogin ? false : true
      };
    case KEYS.CHANGE_TRYING_TO_CREATE_USER:
      return {
        tryingToCreateUser: state.tryingToCreateUser ? false : true
      };
    default:
      return state;
  }
}
