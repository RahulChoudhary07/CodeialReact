import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { addLike, createComment } from "../actions/posts";
import { Comment } from "./";
import { connect } from "react-redux";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;

    if (e.key === "Enter") {
      this.props.dispatch(createComment(comment, post._id));

      // clear comment
      this.setState({
        comment: "",
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  likePostHandle = (e) => {
    const { post, auth } = this.props;
    this.props.dispatch(addLike(post._id, "POST", auth.user._id));
  };

  render() {
    const { post, auth } = this.props;
    const { comment } = this.state;
    const isPostLikeByUser = post.likes.includes(auth.user._id);
    return (
      <div>
        <div className="post-wrapper" key={post._id}>
          <div className="post-header">
            <div className="post-avatar">
              <Link to={`/users/${post.user._id}`}>
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
              </Link>
              <div>
                <span className="post-author">{post.user.name}</span>
                <span className="post-time">a minute ago</span>
              </div>
            </div>
            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <button
                className="post-like no-btn"
                onClick={this.likePostHandle}
              >
                {isPostLikeByUser ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                    alt="like post"
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                )}
                <span>{post.likes.length}pp</span>
              </button>

              <div className="post-comments-icon">
                <img
                  src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className="post-comment-box">
              <input
                placeholder="Start typing a comment"
                onChange={this.handleOnCommentChange}
                onKeyPress={this.handleAddComment}
                value={comment}
              />
            </div>

            <div className="post-comments-list">
              {post.comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              ))}
            </div>
          </div>
        </div>
        )
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Post);
