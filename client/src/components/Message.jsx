import React from 'react';
import PropTypes from 'prop-types';

const Message = props => (
  <div className="chat">
    <div className="user">{props.user}</div>
    <div className="text">{props.text}</div>
  </div>
);

Message.propTypes = {
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
