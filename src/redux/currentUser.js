import axios from "axios";

// ACTION TYPE
const SET_SINGLE_USER = "SET_SINGLE_USER";

// ACTION CREATORS
const setSingleUser = (user) => {
  return {
    type: SET_SINGLE_USER,
    user,
  };
};

// THUNKS
export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/login`, user);
      dispatch(setSingleUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function currentUserReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
