import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message';
class MessageList extends Component {
  
  render() {
    return (
      <div>
        {this.props.messages.map(({ text, username }) => (
          <Message text={text} username={username} />  
        ))}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    username: PropTypes.string,
  })).isRequired,
};

export default MessageList;
