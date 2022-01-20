
import axios from "axios";
import history from "../history";

const TOKEN = "token";


/**
 * ACTION TYPES
 */

const SET_AUTH = "SET_AUTH";
const LOG_OUT = "LOG_OUT"

/**
 * ACTION CREATORS
 */

const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);

  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticateLogin =
  (password, email, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { password, email });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };


export const authenticateSignup =
  (userName, password, email, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        userName,
        password,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);

  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {

  switch (action.type) {
    case SET_AUTH:
      return {...state, ...action.auth};
      case LOG_OUT:
        return state
    default:
      return state;
  }
}
