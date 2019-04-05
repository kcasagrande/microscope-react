import React, { Component } from 'react';
import './Game.css';
import BigPicture from 'BigPicture/BigPicture';
import Game from 'Game/Game';
import Period from 'Period/Period';
import PeriodArea from 'Period/PeriodArea.react';
import AddPeriod from 'AddPeriod';

class GameBoard extends Component {
	constructor(props) {
		super(props);
		this.state = Game();
	}

	updateBigPicture(bigPicture) {
		this.setState(this.state.setBigPicture(bigPicture));
	}

	addPeriodBefore(followingPeriodId) {
		this.setState(this.state.addPeriod(followingPeriodId, Period()));
	}

  render() {
		const periods = this.state.periods.flatMap((period) => {
			return (
				[
					<AddPeriod key={'addBefore-' + period.id} onClick={() => this.addPeriodBefore(period.id)} />,
					<PeriodArea key={period.id} id={period.id} name={period.title} events={period.events} />
				]
			);
		});
		periods.shift();
    return (
			<div>
				<main className="game">
					<BigPicture title={this.state.bigPicture} updateParent={(value) => this.updateBigPicture(value)} />
					<div className='periods'>
						{periods}
					</div>
				</main>
			</div>
    );
  }
}

export default GameBoard;
