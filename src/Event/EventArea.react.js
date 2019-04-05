import React, { Component } from 'react';
import Scene from 'Scene/Scene.react';

class EventArea extends Component {
	render() {
		const scenes = this.props.scenes.map((scene) => {
			return (
				<Scene key={scene.id} id={scene.id} eventId={this.props.id} periodId={this.props.periodId} question={scene.question} />
			);
		});

		return (
			<div id={'period-' + this.props.periodId +'-event-' + this.props.id} className="event">
				<header>
					<h3>{this.props.name}</h3>
				</header>
				{scenes}
			</div>
		);
	}
}

export default EventArea;
