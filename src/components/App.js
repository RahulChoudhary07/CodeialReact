import React, { Component } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import { fetchPost } from "../actions/posts";

import { Navbar, Home, Page404, Login, Signup, Settings } from "./";
import { authenticateUser } from "../actions/auth";
import UserProfile from "./UserProfile";
import { fetchUserFriends } from "../actions/friends";
import UserProfile1 from "./UserProfile1";

// const Settings = () => {
//   return <div>Setting</div>;
// };

const PrivateRoute = (PrivateRouteProps) => {
  const { isLoggedIn, path, component: Component } = PrivateRouteProps;
  // console.log("****isogin**** ", isLoggedIn);
  return (
    <Route
      path={path}
      render={(props) => {
        console.log(props);
        return isLoggedIn ? (
          <Component {...props} />  /////////////////////////////////////////////////////////////// also done by withRouter for sending Router Props
        ) : (
          // <Redirect to="/login" />
          <Redirect
            to={{
              pathname: "/login/",
              state: {
                from: props.location, // from where it is coming // from: { pathname: "prevPath" }
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  componentDidMount() {
    console.log("******** falak ********");
    this.props.dispatch(fetchPost());

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = jwt_decode(token);
        // console.log("***user*** ", user);
        this.props.dispatch(
          authenticateUser({
            email: user.email,
            _id: user._id,
            name: user.name,
          })
        );
        this.props.dispatch(fetchUserFriends());
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    console.log("render app", posts);
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}

          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul> */}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                // use some logic
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLogin={auth.isLogin}
                  />
                );
              }}
            />
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute
              exact
              path="/settings"
              component={Settings}
              isLoggedIn={auth.isLogin}
            />
            <PrivateRoute
              exact
              path="/users/:userId"
              component={UserProfile1}
              isLoggedIn={auth.isLogin}
            />
            {/* <PrivateRoute
              exact
              path="/users/:userId"
              component={UserProfile}
              isLoggedIn={auth.isLogin}
            /> */}

            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// App.propTypes = {
//   posts: Proptypes.array.isRequired,
// };

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(App);
