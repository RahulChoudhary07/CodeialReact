import React, { Component } from "react";
import "../chat.css";
import io from "socket.io-client";
import { connect } from "react-redux";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: "",
    };

    this.socket = io.connect("http://54.237.158.65:5000");
    this.userEmail = props.auth.user.email;
    console.log("***********this.userEmail*************", this.userEmail);
    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    let self = this;
    self.socket.on("connect", function () {
      console.log("***********socket is connected*************");

      self.socket.emit("join_room", {
        chatroom: "codeial",
        user_email: self.userEmail,
      });
    });

    self.socket.on("user_joined", function (data) {
      console.log("New user joined", data);
    });

    self.socket.on("receive_message", function (data) {
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      messageObject.self = false;
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: "",
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit("send_message", {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: "codial",
      });
    }
  };

  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                messages.self
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Chat);
