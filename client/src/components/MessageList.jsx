import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessageList = props => (
  <div>
    {props.messages.map(({ text, user: { username }, id }) => (
      <Message key={id} text={text} user={username} />
    ))}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  })).isRequired,
};

export default MessageList;
