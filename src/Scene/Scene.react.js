import React, { Component } from 'react';

class Scene extends Component {
	render() {
		return(
			<div id={'period-' + this.props.periodId + '-event-' + this.props.eventId + '-scene-' + this.props.id} className="scene">
				<div className="question">{this.props.question}</div>
			</div>
		);
	}
}

export default Scene;
