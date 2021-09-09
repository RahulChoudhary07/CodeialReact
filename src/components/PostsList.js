import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { CreatePost, Post } from "./";

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    if (posts === undefined) {
      return <div>hello</div>;
    }
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: Proptypes.array.isRequired,
};

export default PostsList;
