import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  
  render() {
    return (
      <div>
        <h1>chatterbox</h1>
        <div className="spinner">
          <img src="images/spiffygif_46x46.gif"></img>
        </div>
        <div id="rooms">
          Room:
          <select id="roomSelect">
          </select>
        </div>
        <form action="#" id="send" method="post">
          <input type="text" name="message" id="message"/>
          <input type="submit" name="submit" className="submit"/>
        </form>
        <div id="chats">
        </div>
      </div>
    );
  }
}

export default App;
