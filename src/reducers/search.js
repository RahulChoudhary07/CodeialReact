import { FETCH_SEARCH_RESULTS_SUCCESS } from "../actions/actionTypes";

const currSearchState = {
  results: [],
};

export default function search(currState = currSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...currState,
        results: action.users,
      };

    default:
      return currState;
  }
}
