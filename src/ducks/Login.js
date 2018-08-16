const KEYS = {
  SET_JWT: "SET_JWT",
  RESET_JWT: "RESET_JWT",
  SET_ID: "SET_ID",
  RESET_ID: "RESET_ID"
};
export const setJwt = jwt => ({ type: KEYS.SET_JWT, jwt });
export const resetJwt = () => ({ type: KEYS.RESET_JWT });
export const setId = userId => ({ type: KEYS.SET_ID, userId });
export const resetId = () => ({ type: KEYS.RESET_ID });

export function loginReducer(state = {}, action) {
  switch (action.type) {
    case KEYS.SET_JWT:
      return {
        ...state,
        jwt: action.jwt
      };
    case KEYS.RESET_JWT:
      return {
        ...state,
        jwt: ""
      };
    case KEYS.SET_ID:
      return {
        ...state,
        userId: action.userId
      };
    case KEYS.RESET_ID:
      return {
        ...state,
        userId: ""
      };
    default:
      return state;
  }
}
