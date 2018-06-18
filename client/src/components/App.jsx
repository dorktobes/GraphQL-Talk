import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { graphql } from 'react-apollo';

import Spinner from './Spinner';
import Dropdown from './Dropdown';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

import query from '../queries/fetchMessagesAndRooms';

require('babel-polyfill');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: null,
      currentUser: null,
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.refetchMessages = this.refetchMessages.bind(this);
  }
  async componentDidMount() {
    const username = this.state.currentUser || (prompt('What is your name?') || 'anonymous');
    try {
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
        currentUser,
      });
    } catch (err) {
      console.error(err);
    }
  }
  handleRoomChange(e) {
    this.setState({
      selectedRoom: this.props.data.rooms.filter(({ id }) => id === e.target.value)[0],
    });
  }
  async refetchMessages() {
    this.props.data.refetch();
  }
  render() {
    const { data: { loading, rooms, messages } } = this.props;
    if (!loading) {
      return (
        <div>
          <h1>chatterbox</h1>
          <div id="rooms">
            Room:
            <Dropdown
              id="roomSelect"
              handleChange={this.handleRoomChange}
              options={rooms.map(({ name, id }) => ({ text: name, value: id }))}
            />
          </div>
          <MessageInput
            currentUser={this.state.currentUser}
            currentRoom={(this.state.selectedRoom || rooms[0])}
            refetchMessages={this.refetchMessages}
          />
          <div id="chats">
            <MessageList
              messages={
                messages.filter(({ room: { id } }) => (
                  id === (this.state.selectedRoom ? this.state.selectedRoom.id : rooms[0].id)
                ))
              }
            />
          </div>
        </div>
      );
    }
    return <Spinner loading={this.props.data.loading} />;
  }
}

App.propTypes = {
  data: Proptypes.shape({
    loading: Proptypes.bool,
    refetch: Proptypes.func.isRequired,
    rooms: Proptypes.arrayOf(Proptypes.shape({
      name: Proptypes.string,
    })),
  }).isRequired,
};

export default graphql(query)(App);
