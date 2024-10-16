// importing react for the component
import { useEffect, useState } from "react";
// importing Link for the routing links
import { Link } from "react-router-dom";
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
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { PageHeader } from "../PageHeader/PageHeader";
import { INITIAL_POST_STATE } from "../lib/constants";

const Posts = () => {
  const [toggle, setToggle] = useState(false);
  const [singlePost, setSinglePost] = useState(INITIAL_POST_STATE);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const disableUpdateBtn = !singlePost.title || !singlePost.body;

  useEffect(() => {
    if (!posts.length) {
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
    setSinglePost(INITIAL_POST_STATE);
  };

  // update state for inputs and textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSinglePost({
      ...singlePost,
      [name]: value
    });
  };

  // dispatch action on submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, body } = singlePost;
    dispatch(createPostAction({ title, body, uid: uid() }));
    setSinglePost(INITIAL_POST_STATE);
    setToggle(!toggle);
  };

  // map over the posts a create card components
  const cards = posts.map(({ id, title, body, uid = "" }) => (
    <Card
      key={`${id}${uid}`}
      title={title}
      body={body}
      footer={
        <>
          <Link to={`/posts/${id}`} state={{ uid }}>
            View Post
          </Link>{" "}
          <button
            className="btn btn-danger"
            onClick={() => handleDeletPostClick({ id, uid })}
          >
            delete
          </button>
        </>
      }
    />
  ));

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <PageHeader>
            <p className="lead">Create a post and upload it</p>
            {!toggle && (
              <button className="btn btn-warning" onClick={toggleForm}>
                create post
              </button>
            )}
          </PageHeader>
        </div>
      </div>
      {toggle && (
        <Form onSubmit={handleFormSubmit}>
          <div className="form-group my-3">
            <Input
              type="text"
              name="title"
              className="form-control"
              onChange={handleChange}
              placeholder="title"
              value={singlePost.title}
            />
          </div>
          <div className="form-group my-3">
            <TextArea
              name="body"
              rows="10"
              cols="30"
              className="form-control"
              onChange={handleChange}
              placeholder="body"
              value={singlePost.body}
            />
          </div>
          <div className="form-group my-3">
            <Input
              type="submit"
              className="btn btn-info"
              value="Upload"
              disabled={disableUpdateBtn}
            />
            <Button
              type="button"
              className="btn btn-danger mx-2"
              onClick={toggleForm}
            >
              cancel
            </Button>
          </div>
        </Form>
      )}
      <div className="d-flex flex-wrap justify-content-between my-5">
        {cards}
      </div>
    </div>
  );
};

export default Posts;
