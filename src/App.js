import React, { Component } from 'react';
import './App.css';
import GameBoard from './Game/GameBoard.react';

class App extends Component {
  render() {
    return (
      <div className="App">
				<GameBoard />
      </div>
    );
  }
}

export default App;
