import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearAuthState, login } from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    // uncontrolled component form handling
    // hamdle by DOM
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();

    // controlled component form handling
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("this.emailInputRef ", this.emailInputRef);
    // console.log("this.passwordInputRef ", this.passwordInputRef);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }

    console.log("******************");
  };

  handleEmailChange = (e) => {
    // this.email = e.target.value;
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    // this.password = e.target.value;
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    console.log("****************", this.props);
    const { error, isProgress, isLogin } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    // console.log("Render", isProgress);
    if (isLogin) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            value={this.state.email}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
            value={this.state.password}
            required
          />
        </div>
        <div className="field">
          {isProgress ? (
            <button onClick={this.handleFormSubmit} disabled={isProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={isProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
