import React, { Component } from 'react';
import './Game.css';
import BigPicture from './BigPicture';
import Period from './Period';
import GameInput from './GameInput';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bigPicture: 'The Big Picture',
			periods: [
				{
					id: 'start',
					name: 'Start period',
					events: [
						{
							id: 'e1',
							name: 'Event 1',
							scenes: [
								{
									id: 's1',
									question: 'Question for scene 1'
								},
								{
									id: 's2',
									question: 'Question for scene 2'
								}
							]
						},
						{
							id: 'e2',
							name: 'Event 2',
							scenes: [
								{
									id: 's3',
									question: 'Question for scene 3'
								}
							]
						}
					]
				},
				{
					id: 'end',
					name: 'End period',
					events: [
						{
							id: 'e3',
							name: 'Event 3',
							scenes: []
						},
						{
							id: 'e4',
							name: 'Event 4',
							scenes: []
						}
					]
				}
			]
		};
	}

	updateBigPicture(bigPicture) {
		this.setState({
			bigPicture: bigPicture
		});
	}

	updateData(data) {
		this.setState(data);
	}

  render() {
		const periods = this.state.periods.map((period) => {
			return (
				<Period key={period.id} id={period.id} name={period.name} events={period.events} />
			);
		});
    return (
			<div>
				<main className="game">
					<BigPicture title={this.state.bigPicture} updateParent={(value) => this.updateBigPicture(value)} />
					{periods}
				</main>
				<GameInput data={JSON.stringify(this.state, null, 2)} updateParent={(value) => this.updateData(value)} />
			</div>
    );
  }
}

export default Game;
