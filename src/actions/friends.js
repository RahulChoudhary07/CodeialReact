import { APIUrls } from "../helpers/API_urls";
import {
  ADD_FRIEND,
  FETCH_FRIEND_SUCCESS,
  REMOVE_FRIEND,
  UPDATE_POST_LIKE,
} from "./actionTypes";

export function fetchUserFriends(userId) {
  return (dispatch,getstate) => {              ////////////////////////////////// important   ////////////////////////////
    const url = APIUrls.userFriends(userId);
    const token = localStorage.getItem("token");
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        dispatch(fetchFriendsSucces(data.data.friends));
      });
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIEND_SUCCESS,
    friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
