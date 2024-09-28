// importing Link for routing nav links
import { Link } from "react-router-dom";

// component that represents the navigation across this web app
export const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="nav-link">
        CRUD
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">
              posts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
