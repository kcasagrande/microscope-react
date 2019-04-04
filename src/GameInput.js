import React, { Component } from 'react';

class GameInput extends Component {

	handleChange(event) {
		this.props.updateParent(JSON.parse(event.target.value));
	}

	render() {
		return (
			<textarea className='gameInput' value={this.props.data} onChange={(event) => this.handleChange(event)} />
		);
	}
}

export default GameInput;
