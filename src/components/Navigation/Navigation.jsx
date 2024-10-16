// importing Link for routing nav links
import { NavLink } from "react-router-dom";

// component that represents the navigation across this web app
export const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
    <NavLink to="/" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
      CRUD
    </NavLink>
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
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/posts" className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
            Posts
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
