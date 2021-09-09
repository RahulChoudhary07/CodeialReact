import { APIUrls } from "../helpers/API_urls";
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
} from "./actionTypes";

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILED,
    error,
  };
}

export function getUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIUrls.userProfile(userId);
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
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
          return;
        }

        dispatch(userProfileFailure(data.message));
      });
  };
}
