import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onInputChange(e) {
    const message = e.target.value;
    this.setState({ message });
  }
  handleSubmit(e) {
    e.preventDefault();
    const message = {
      text: this.state.message,
      user: this.props.currentUser._id,
      room: this.props.currentRoom._id,
    };
    fetch('/messages', {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(message),
      method: 'POST',
    })
    .then((response) => {
      if(response.ok) {
        this.props.refetchMessages();
      }
    })
  }
  
  render() {
    return (
      <form
        id="send"
        onSubmit={this.handleSubmit}
      >
        <input
        type="text"
        name="message"
        id="message"
        value={this.state.message}
        onChange={this.onInputChange}
      />
        <input type="submit" name="submit" className="submit"/>
      </form>
    );
  }
}

MessageInput.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  currentRoom: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

MessageInput.defaultProps = {
  currentUser: {
    username: 'anon',
  },
  currentUser: {
    name: 'lobby',
  }
};

export default MessageInput;
