import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessageList = props => (
  <div>
    {props.messages.map(({ text, user, _id }) => (
      <Message key={_id} text={text} user={user} />
    ))}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    username: PropTypes.string,
  })).isRequired,
};

export default MessageList;
