//let change;
//(this.state.loggedIn) ? change = false : change = true
//this.setState({ loggedIn: change })
export function headingReducer(state = {}, action) {
  switch(action.type) {
    case 'CHANGE_LOGGED_IN':
      return {
        loggedIn: state.loggedIn ? false : true
      }
    default:
      return state;
  }
}
