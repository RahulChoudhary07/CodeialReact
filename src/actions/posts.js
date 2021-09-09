import {
  ADD_COMMENT,
  CREATE_POST,
  UPDATE_POST,
  UPDATE_POST_LIKE,
} from "./actionTypes";
import { APIUrls } from "../helpers/API_urls";
import { getFormBody } from "../helpers/utils";

export function fetchPost() {
  return (dispatch) => {
    const url = APIUrls.fetchPost();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POST,
    posts: posts,
  };
}

export function addPost(post) {
  return {
    type: CREATE_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({
        content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          dispatch(addPost(data.data.post));
          return;
        }
      });
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const url = APIUrls.toggleLike(id, likeType);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data like", data);
        if (data.success) {
          dispatch(addLiketoStore(id, userId));
        }
      });
  };
}

export function addLiketoStore(id, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId: id,
    userId,
  };
}
