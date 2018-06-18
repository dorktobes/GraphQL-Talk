import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '...loading',
    };
  }
  componentDidMount() {
    fetch(`/users/${this.props.user}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ user: data.username });
      });
  }
  render() {
    return (
      <div className="chat">
        <div className="user">{this.state.user}</div>
        <div className="text">{this.props.text}</div>
      </div>
    );
  }
}

Message.propTypes = {
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
