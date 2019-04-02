import React, { Component } from 'react';
import Scene from './Scene';

class Event extends Component {
	render() {
		const scenes = this.props.scenes.map((scene) => {
			return (
				<Scene question={scene.question} />
			);
		});

		return (
			<div class="event">
				<header>
					<h3>{this.props.name}</h3>
				</header>
				{scenes}
			</div>
		);
	}
}

export default Event;
