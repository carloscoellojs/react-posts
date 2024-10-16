import {
  getPosts,
  getPostsError,
  getSinglePost,
  getSinglePostError,
  createPost,
  createPostError,
  updatePost,
  updatePostError,
  deletePost,
  deletePostError
} from "../reducers/posts/postsReducer";

// importing axios for creating requests
import axios from "axios";

// this method makes a get request to JSON placeholder for 20 posts
export const getPostsAction = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_limit=20"
    );
    dispatch(getPosts(response.data));
  } catch (e) {
    dispatch(getPostsError(e));
  }
};

// this method makes a request to JSON placeholder, we ask to send back a specific post
export const getSinglePostAction = ({ id, uid }) => async (dispatch) => {
  try {
    dispatch(getSinglePost({ id, uid }));
  } catch (e) {
    dispatch(getSinglePostError(e));
  }
};

// this method creates a fake post on JSON placeholder
export const createPostAction = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );
    dispatch(createPost(response.data));
  } catch (e) {
    dispatch(createPostError(e));
  }
};

// this method deletes a post from the current posts array
export const deletePostAction = ({ id, uid }) => async (dispatch) => {
  try {
    if(!uid){
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }
    dispatch(deletePost({ id, uid }));
  } catch (e) {
    dispatch(deletePostError(e));
  }
};

// this method updates a specific post
export const updatePostAction = ({ id, title, body, uid }) => async (dispatch) => {
  try {
    let response = {};
    if(!uid){
      response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { id, title, body }
      );
    }
    const data = uid ? { id, title, body, uid  } : { ...response.data, uid };
    dispatch(updatePost(data));
  } catch (e) {
    dispatch(updatePostError(e));
  }
};
