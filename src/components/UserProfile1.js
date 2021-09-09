import React, { useEffect, useState } from "react";
import combineReducers from "../reducers/index";
import { addFriend, removeFriend } from "../actions/friends";
import { getUserProfile } from "../actions/profile";
import { APIUrls } from "../helpers/API_urls";
import { useSelector, useStore } from "react-redux";

function UserProfile1(props) {
  const initialState = {
    success: null,
    error: null,
    successMessage: null,
  };

  const store = useStore(); /////   for dispatch

  const profile = useSelector((state) => state.profile); //// like connect
  const friends = useSelector((state) => state.friends); //// like connect

  const [state, setStateHook] = useState(initialState);

  useEffect(() => {
    const { match } = props;
    if (match.params.userId) {
      // dispatch an action
      store.dispatch(getUserProfile(match.params.userId));
    }
  }, []);

  useEffect(() => {
    const {
      match: { params: currParams },
    } = props;
    if (currParams) {
      store.dispatch(getUserProfile(currParams.userId));
    }
  }, [props]);

  console.log("***********************************");
  console.log(store.getState());
  console.log(profile);
  console.log(friends);
  console.log("***********************************");

  const checkFriend = () => {
    const { match } = props;
    const userId = match.params.userId;
    const friendsId = friends.map((friend) => friend.to_user._id);
    return friendsId.includes(userId);
  };

  const handleAddFriendClick = async () => {
    const userId = props.match.params.userId;
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
      setStateHook((prevstate) => {
        return {
          success: true,
          error: null,
          successMessage: "Add friend successfully!",
        };
      });
      store.dispatch(addFriend(data.data.friendship));
    } else {
      setStateHook((prevstate) => {
        return {
          ...prevstate,
          success: null,
          error: data.message,
        };
      });
    }
  };

  const handleRemoveFriendClick = async () => {
    // Mini Assignment
    const userId = props.match.params.userId;
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
      setStateHook((prevstate) => {
        return {
          success: true,
          error: null,
          successMessage: "Remove friend successfully!",
        };
      });
      store.dispatch(removeFriend(userId));
    } else {
      setStateHook((prevstate) => {
        return {
          ...prevstate,
          success: null,
          error: data.message,
        };
      });
    }
  };

  const {
    match: { params },
  } = props;
  const user = profile.user;
  const isFriend = checkFriend();
  const { success, error, successMessage } = state;
  if (profile.isProgress) {
    return <h1>Loading</h1>;
  }
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
          <button className="button save-btn" onClick={handleAddFriendClick}>
            Add Friend
          </button>
        ) : (
          <button className="button save-btn" onClick={handleRemoveFriendClick}>
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

export default UserProfile1;
