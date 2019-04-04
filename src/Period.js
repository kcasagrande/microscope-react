import React, { Component } from 'react';
import Event from './Event';
import './Period.css';

class Period extends Component {
	render() {
		const events = this.props.events.map((event) => {
			return(
				<Event key={event.id} id={event.id} periodId={this.props.id} name={event.name} scenes={event.scenes} />
			);
		});
		return (
			<div id={'period-' + this.props.id} className={'period' + (!this.props.name ? ' unnamed' : '')}>
				<header>
					<h2 className='name'>{this.props.name}</h2>
				</header>
				<button onClick={() => this.props.onClick()}>+</button>
				{events}
			</div>
		);
	}
}

export default Period;
