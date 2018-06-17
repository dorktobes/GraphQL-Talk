require("babel-polyfill");
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import Dropdown from './Dropdown';
import MessageInput from './MessageInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedRoom: null,
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }
  async componentDidMount() {
    try{
    const rooms = await fetch('/rooms').then(res => res.json());

    } catch(err) {
      
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
            options={this.props.rooms.map(({name}) => ({ text: name, value: name, }))}
          />
        </div>
        <MessageInput />
        <div id="chats">
        </div>
      </div>
    );
  }
}

App.propTypes = {
  rooms: PropTypes.array
}
App.defaultProps = {
  rooms: [],
}

export default App;
