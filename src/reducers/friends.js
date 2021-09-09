import {
  ADD_FRIEND,
  FETCH_FRIEND_SUCCESS,
  REMOVE_FRIEND,
} from "../actions/actionTypes";

const currfriendsState = [];

export default function friends(currState = currfriendsState, action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return currState.concat(action.friend);
    case REMOVE_FRIEND:
      const newArr = currState.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArr;
    default:
      return currState;
  }
}
