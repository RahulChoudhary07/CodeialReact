import React, { Component } from "react";
import { connect } from "react-redux";
import { addFriend, removeFriend } from "../actions/friends";
import { getUserProfile } from "../actions/profile";
import { APIUrls } from "../helpers/API_urls";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(getUserProfile(match.params.userId));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;
    const {
      match: { params: currParams },
    } = this.props;
    if (prevParams && currParams && prevParams.userId !== currParams.userId) {
      this.props.dispatch(getUserProfile(currParams.userId));
    }
  }

  checkFriend = () => {
    const { match, friends } = this.props;
    const userId = match.params.userId;
    const friendsId = friends.map((friend) => friend.to_user._id);
    return friendsId.includes(userId);
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        error: null,
        successMessage: "Add friend successfully!",
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    // Mini Assignment
    const userId = this.props.match.params.userId;
    const url = APIUrls.removeFriend(userId);
    const token = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log("await data", data);

    if (data.success) {
      // show user message
      this.setState({
        success: true,
        successMessage: "Removed friends successfully!",
        error: null,
      });
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    console.log("this.props", params);
    const user = profile.user;

    if (profile.isProgress) {
      return <h1>Loading</h1>;
    }

    const isFriend = this.checkFriend();
    const { success, error, successMessage } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}
          {success && (
            <div className="alert success-dailog">{successMessage}</div>
          )}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ profile, friends }) => {
  return {
    profile,
    friends,
  };
};

export default connect(mapStateToProps)(UserProfile);
