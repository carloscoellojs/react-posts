import { useEffect, useState } from "react";
// importing connect for connecting this component to redux to access store state
import { useDispatch, useSelector } from "react-redux";
// importing actions for dispatching them inside this component
import {
  getSinglePostAction,
  updatePostAction
} from "../../actions/postsActions";
import { Link, useLocation } from "react-router-dom";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { PageHeader } from "../PageHeader/PageHeader";
import { INITIAL_POST_STATE } from "../lib/constants";

const SinglePost = () => {
  const [toggle, setToggle] = useState(false);
  const [singlePost, setSinglePost] = useState(INITIAL_POST_STATE);
  const [loading, setLoading] = useState(false);
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const location = useLocation();
  const disableUpdateBtn = !singlePost.title || !singlePost.body;

  // lifecyle, on mount dispatch action to fetch a specific post
  useEffect(() => {
    const {
      pathname,
      state: { uid }
    } = location;
    const id = pathname ? JSON.parse(pathname.split("/")[2]) : "";
    dispatch(getSinglePostAction({ id, uid }));
  }, []);

  // lifecycle, if props have been updated please update component state
  useEffect(() => {
    setSinglePost({
      ...post
    });
    setLoading(false);
  }, [post]);

  // show hide elements
  const toggleForm = () => {
    setToggle(!toggle);
    setSinglePost({
      ...post
    });
  };

  // update component state inputs textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSinglePost({
      ...singlePost,
      [name]: value
    });
  };

  // dispatch action to update this post
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, body, id, uid = "" } = singlePost;
    setLoading(true);
    dispatch(
      updatePostAction({
        uid,
        id,
        title,
        body
      })
    );
    setSinglePost(INITIAL_POST_STATE);
    setToggle(!toggle);
  };

  return (
    <div className="container my-5">
      <PageHeader>
        <header>
          <h1>Single post</h1>
          <hr />
        </header>
      </PageHeader>
      {!toggle && (
        <Card
          title={singlePost.title}
          body={singlePost.body}
          loading={loading}
          onClick={toggleForm}
          footer={
            <>
              <button className="btn btn-info" onClick={toggleForm}>
                update
              </button>{" "}
              <button className="btn btn-warning">
                <Link to={`/posts`}>Back to posts</Link>
              </button>
            </>
          }
        />
      )}
      {toggle && (
        <Form className="my-5" onSubmit={handleFormSubmit}>
          <p className="lead text-primary">updating my post awesome</p>
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
              className="btn btn-primary"
              value="Update Post"
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
    </div>
  );
};

export default SinglePost;
