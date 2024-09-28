import { useEffect } from "react";
import { getPostsAction } from "../../actions/postsActions";
import { useDispatch } from "react-redux";

// home page for the Home route
export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, []);

  return (
    <header className="jumbotron jumbotron-fluid">
      <div className="container">
        <h2 className="display-4">React Redux CRUD web app</h2>
        <p className="lead">Create, Read, Update, Delete your posts</p>
      </div>
    </header>
  );
};
