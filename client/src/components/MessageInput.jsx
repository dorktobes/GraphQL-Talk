import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(e) {
    const message = e.target.value;
    this.setState({ message });
  }
  
  render() {
    return (
      <form action="#" id="send" method="post">
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
  
};

export default MessageInput;
