import axios from "axios";

// ACTION TYPE
const SET_CURRENT_USER = "SET_CURRENT_USER";

// ACTION CREATORS
const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

// THUNKS
export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/login`, user);
      dispatch(setCurrentUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function currentUserReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    default:
      return state;
  }
}
