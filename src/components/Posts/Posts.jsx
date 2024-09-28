// importing react for the component
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
// connecting the component to redux
import { useDispatch, useSelector } from "react-redux";
// importing actions for dispatching them inside this component
import {
  createPostAction,
  deletePostAction,
  getPostsAction
} from "../../actions/postsActions";
import { uid } from "uid";

const Posts = () => {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!posts.length){
      dispatch(getPostsAction());
    }
  }, []);

  // dispatch delete action
  const handleDeletPostClick = (data) => {
    dispatch(deletePostAction(data));
  };

  // hide show elements
  const toggleForm = () => {
    setToggle(!toggle);
  };

  // update state for inputs and textarea
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

  // dispatch action on submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPostAction({ title, body, uid: uid() }));
    setTitle("");
    setBody("");
    setToggle(!toggle);
  };

  // map over the posts a create card components
  const cards = posts.map((post) => (
    <Card
      key={post.id}
      id={post.id}
      title={post.title}
      body={post.body}
      uid={post.uid ? post.uid : ''}
      onClick={handleDeletPostClick}
    />
  ));
  const disableUpdateBtn = !title || !body;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <p className="lead">Create a post and upload it</p>
          {!toggle && (
            <button className="btn btn-warning" onClick={toggleForm}>
              create post
            </button>
          )}
        </div>
      </div>
      {toggle && (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="title"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="body"
              className="form-control"
              cols="30"
              rows="10"
              placeholder="body"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Upload"
              className="btn btn-info"
              disabled={disableUpdateBtn}
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
      <div className="d-flex flex-wrap justify-content-between my-5">
        {cards}
      </div>
    </div>
  );
};

export default Posts;
