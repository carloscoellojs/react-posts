import { useEffect, useState } from "react";
// importing prop types for props control
import PropTypes from "prop-types";
// importing connect for connecting this component to redux to access store state
import { useDispatch, useSelector } from "react-redux";
// importing actions for dispatching them inside this component
import {
  getSinglePostAction,
  updatePostAction
} from "../../actions/postsActions";
import { Link, useLocation } from "react-router-dom";

const SinglePost = () => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState("");
  const [postUid, setPostUid] = useState("");
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const location = useLocation();

  // lifecyle, on mount dispatch action to fetch a specific post
  useEffect(() => {
    const { pathname, state } = location;
    const id = JSON.parse(pathname.split("/")[2]);
    dispatch(getSinglePostAction({ id, uid: state.uid }));
  }, []);

  // lifecycle, if props have been updated please update component state
  useEffect(() => {
    const { title, body, id, uid = '' } = post;

    setTitle(title);
    setBody(body);
    setPostId(id);
    setPostUid(uid);
  }, [post]);

  // show hide elements
  const toggleForm = () => {
    const { title, body } = post;
    setToggle(!toggle);
    setTitle(title);
    setBody(body);
  };

  // update component state inputs textarea
  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    switch (name) {
      case "title":
        setTitle(val);
        break;
      case "body":
        setBody(val);
        break;
      default:
    }
  };

  // dispatch action to update this post
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePostAction({
        title,
        body,
        id: postId,
        uid: postUid
      })
    );
    setTitle("");
    setBody("");
    setToggle(!toggle);
  };

  return (
    <div className="container my-5">
      <header>
        <h1>Single post</h1>
        <hr />
      </header>
      {!toggle && (
        <div className="card" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-info" onClick={toggleForm}>
              update
            </button>
            {" "}
            <button className="btn btn-warning">
              <Link to={`/posts`}>Back to posts</Link>
            </button>
          </div>
        </div>
      )}
      {toggle && (
        <form className="my-5" onSubmit={handleFormSubmit}>
          <p className="lead text-primary">updating my post awesome :)</p>
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="body"
              className="form-control"
              cols="30"
              rows="10"
              value={body}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Post"
              className="btn btn-primary"
            />
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={toggleForm}
            >
              cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// prop control, this is what we expect
SinglePost.propTypes = {
  post: PropTypes.object
};

export default SinglePost;
