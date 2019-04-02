import React, { Component } from 'react';

class Scene extends Component {
	render() {
		return(
			<div class="scene">
				<div class="question">{this.props.question}</div>
			</div>
		);
	}
}

export default Scene;
