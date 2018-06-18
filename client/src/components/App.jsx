import React, { Component } from 'react';

import Spinner from './Spinner';
import Dropdown from './Dropdown';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

require('babel-polyfill');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rooms: [],
      selectedRoom: null,
      currentUser: null,
      messages: [],
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.refetchMessages = this.refetchMessages.bind(this);
  }
  async componentDidMount() {
    const username = this.state.currentUser || (prompt('What is your name?') || 'anonymous');
    try {
      const rooms = await fetch('/rooms').then(res => res.json());
      const messages = await fetch('/messages').then(res => res.json());
      let currentUser = await fetch(`/users/name/${username}`).then(res => res.json());
      if (!currentUser.username) {
        currentUser = await fetch('/users', {
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ username }),
          method: 'POST',
        })
          .then(res => res.json());
      }

      this.setState({
        rooms,
        messages,
        currentUser,
        selectedRoom: rooms[0],
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  }
  toggleLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  }
  handleRoomChange(e) {
    this.setState({
      selectedRoom: this.state.rooms[e.target.value],
    });
  }
  async refetchMessages() {
    const messages = await fetch('/messages').then(res => res.json());
    this.setState({ messages });
  }
  render() {
    return (
      <div>
        <h1>chatterbox</h1>
        <Spinner loading={this.state.loading} />
        <div id="rooms">
          Room:
          <Dropdown
            id="roomSelect"
            handleChange={this.handleRoomChange}
            options={this.state.rooms.map(({ name }, i) => ({ text: name, value: i }))}
          />
        </div>
        <MessageInput
          currentUser={this.state.currentUser}
          currentRoom={this.state.selectedRoom}
          refetchMessages={this.refetchMessages}
        />
        <div id="chats">
          <MessageList
            messages={
              this.state.messages.filter(({ room }) => room === this.state.selectedRoom._id)
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
