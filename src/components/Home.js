import React, { Component } from "react";
import { PostsList, FriendsList, Chat } from "./";

class Home extends Component {
  render() {
    const { posts, friends, isLogin } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLogin && <FriendsList friends={friends} />}
        {isLogin && <Chat />}
      </div>
    );
  }
}

export default Home;
