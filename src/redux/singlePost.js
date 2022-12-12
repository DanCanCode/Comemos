import axios from "axios";

// ACTION TYPE
const SET_SINGLE_POST = "SET_SINGLE_POST";

// ACTION CREATORS
const setSinglePost = (post) => {
  return {
    type: SET_SINGLE_POST,
    post,
  };
};

// THUNKS
export const fetchPost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/posts/${id}`);
      dispatch(setSinglePost(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function singlePostReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_POST:
      return action.post;
    default:
      return state;
  }
}
