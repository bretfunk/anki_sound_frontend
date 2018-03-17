export function headingReducer(state = {}, action) {
  switch(action.type) {
    case 'CHANGE_LOGGED_IN':
      return {
        loggedIn: state.loggedIn ? false : true
      }
    case 'CHANGE_TRYING_TO_LOGIN':
      return {
        tryingToLogin: state.tryingToLogin ? false : true
      }
    case 'CHANGE_TRYING_TO_CREATE_USER':
      return {
        tryingToCreateUser: state.tryingToCreateUser ? false : true
      }
    default:
      return state;
  }
}
