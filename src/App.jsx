// redux
import { Provider } from "react-redux";
import store from "./reducers/store";

// react router dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./components/Home/Home";
import Posts from "./components/Posts/Posts";
import SinglePost from "./components/SinglePost/SinglePost";

//stylesheet
import "./App.css";

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/posts" Component={Posts} />
            <Route path="/posts/:postId" Component={SinglePost} />
          </Routes>
        </div>
      </Router>
    </div>
  </Provider>
);

export default App;
