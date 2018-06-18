require("babel-polyfill");
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import Dropdown from './Dropdown';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

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
  }
  async componentDidMount() {
    try{
    const rooms = await fetch('/rooms').then(res => res.json());
    const messages = await fetch('/messages').then(res => res.json());
    const username = window.location.search.split('=')[1];
    let currentUser = await fetch(`/users/${username}`).then(res => res.json());
    console.log(currentUser);
    if (!currentUser.username) {
      currentUser = await fetch('/users', {
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username: username
        }),
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
    } catch(err) {
      console.error(err);
    }
  }
  toggleLoading() {
    this.setState({
      loading: !this.state.loading,
    })
  }
  handleRoomChange(e){
    this.setState({
      selectedRoom: e.target.value,
    })
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
            options={this.state.rooms.map(({name}) => ({ text: name, value: name, }))}
          />
        </div>
        <MessageInput />
        <div id="chats">
          <MessageList messages={this.state.messages.filter(({ room }) => room === this.state.selectedRoom.__id)} />
        </div>
      </div>
    );
  }
}

export default App;
