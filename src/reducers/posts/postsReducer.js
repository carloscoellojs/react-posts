import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: {},
    error: {}
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getPostsError: (state, action) => {
      state.error = action.payload;
    },
    getSinglePost: (state, action) => {
      const objKey = Boolean(action.payload.userId) ? 'uid' : 'id';
      const assignPost = state.posts.filter((doc) => doc[objKey] === action.payload[objKey])[0];
      state.post = assignPost;
    },
    getSinglePostError: (state, action) => {
      state.error = action.payload;
    },
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    createPostError: (state, action) => {
      state.error = action.payload;
    },
    updatePost: (state, action) => {
      const objKey = Boolean(action.payload.uid) ? 'uid' : 'id';
      state.post = action.payload;
      state.posts = state.posts.map(doc => doc[objKey] === action.payload[objKey] ? { ...action.payload } : doc);
    },
    updatePostError: (state, action) => {
      state.error = action.payload;
    },
    deletePost: (state, action) => {
      const objKey = Boolean(action.payload.uid) ? 'uid' : 'id';
      const newPosts = state.posts.filter((doc) => doc[objKey] !== action.payload[objKey]);
      state.posts = newPosts;
    },
    deletePostError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
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
} = postsSlice.actions;

export default postsSlice.reducer;
