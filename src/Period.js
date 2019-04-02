import React, { Component } from 'react';
import Event from './Event';

class Period extends Component {
	render() {
		const events = this.props.events.map((event) => {
			return(
				<Event name={event.name} scenes={event.scenes} />
			);
		});
		return (
			<div class="period">
				<header>
					<h2>{this.props.name}</h2>
				</header>
				{events}
			</div>
		);
	}
}

export default Period;
