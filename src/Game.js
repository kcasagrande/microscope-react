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
				{
					name: 'Start period',
					events: [
						{
							name: 'Event 1',
							scenes: [
								{
									question: 'Question for scene 1'
								},
								{
									question: 'Question for scene 2'
								}
							]
						},
						{
							name: 'Event 2',
							scenes: [
								{
									question: 'Question for scene 3'
								}
							]
						}
					]
				},
				{
					name: 'End period',
					events: [
						{
							name: 'Event 3',
							scenes: []
						},
						{
							name: 'Event 4',
							scenes: []
						}
					]
				}
			]
		};
	}

  render() {
		const periods = this.state.periods.map((period) => {
			return (
				<Period name={period.name} events={period.events} />
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
