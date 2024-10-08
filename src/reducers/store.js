import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postsReducer";

export default configureStore({
  reducer: {
    posts: postsReducer
  }
});
