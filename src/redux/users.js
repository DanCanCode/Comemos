import axios from "axios";

// ACTION TYPES
const ADD_USER = "ADD_USER";
const SET_USERS = "SET_USERS";
const SET_SINGLE_USER = "SET_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

// ACTION CREATORS
const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const setSingleUser = (user) => {
  return {
    type: SET_SINGLE_USER,
    user,
  };
};

const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

// THUNKS
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      dispatch(setSingleUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/signup", user);
      dispatch(addUser(data));
    } catch (error) {}
  };
};

export const updatedUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${user._id}`, user);
    console.log(data);
    dispatch(updateUser(data));
  };
};

export const removeUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/users/${id}`);
    dispatch(deleteUser(data));
  };
};

// REDUCER
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case SET_SINGLE_USER:
      return action.user;
    case ADD_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return state.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
