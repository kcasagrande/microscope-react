import React, { Component } from 'react';
import Event from './Event';

class Period extends Component {
	render() {
		const events = this.props.events.map((event) => {
			return(
				<Event key={event.id} id={event.id} periodId={this.props.id} name={event.name} scenes={event.scenes} />
			);
		});
		return (
			<div id={'period-' + this.props.id} className="period">
				<header>
					<h2>{this.props.name}</h2>
				</header>
				{events}
			</div>
		);
	}
}

export default Period;
