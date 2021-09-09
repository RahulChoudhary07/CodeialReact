import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
} from "../actions/actionTypes";

export const currProfileState = {
  user: {},
  error: null,
  success: null,
  isProgress: false,
};

export default function profile(currState = currProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...currState,
        success: true,
        user: action.user,
        isProgress: false,
        error: null,
      };
    case USER_PROFILE_FAILED:
      return {
        ...currState,
        error: action.error,
        isProgress: false,
      };
    case FETCH_USER_PROFILE:
      return {
        ...currState,
        isProgress: true,
      };
    default:
      return currState;
  }
}
