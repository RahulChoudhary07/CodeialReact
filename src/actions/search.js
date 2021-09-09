import { APIUrls } from "../helpers/API_urls";
import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";

export function searchResultSucess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users: users,
  };
}

export function searchUsers(searchText) {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const url = APIUrls.searchUser(searchText);
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data like", data);
        if (data.success) {
          dispatch(searchResultSucess(data.data.users));
        } else {
          dispatch(searchResultSucess([]));
        }
      });
  };
}
