import React, { Component } from 'react';

class AddPeriod extends Component {
	handleClick() {
		this.props.onClick();
	}

	render() {
		return(
			<button onClick={() => this.handleClick()}>+</button>
		);
	}
}

export default AddPeriod;
