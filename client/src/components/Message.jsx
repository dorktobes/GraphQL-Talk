import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  
  render() {
    return (
    <div className="chat">
      <div className="user">props.username</div>
      <div className="text">props.text</div>
    </div>
    );
  }
}

Message.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
