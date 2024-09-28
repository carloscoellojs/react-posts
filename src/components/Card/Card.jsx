// importing PropTypes for prop control
import PropTypes from "prop-types";
// importing Link for the routing links
import { Link } from "react-router-dom";

// component for displaying each post inside of Posts component
export const Card = (props) => {
  return (
    <div className="card my-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.body}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <Link to={`/posts/${props.id}`} state={{ uid: props.uid }}>View Post</Link>{" "}
        <button
          className="btn btn-danger"
          onClick={() => props.onClick({ id: props.id, uid: props.uid })}
        >
          delete
        </button>
      </div>
    </div>
  );
};

// type of props that this component expects and/or requires
Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};
