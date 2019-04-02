import React, { Component } from 'react';
import './Game.css';
import BigPicture from './BigPicture';
import Period from './Period';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bigPicture: 'The Big Picture',
			periods: [
				'Start period',
				'End period'
			]
		};
	}

  render() {
		const periods = this.state.periods.map((period) => {
			return (
				<Period name={period} />
			);
		});
    return (
			<main class="game">
				<BigPicture title={this.state.bigPicture}/>
				{periods}
			</main>
    );
  }
}

export default Game;
