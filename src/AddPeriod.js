import React, { Component } from 'react';

class AddPeriod extends Component {
	handleClick() {
		this.props.onClick();
	}

	render() {
		return(
			<button onClick={() => this.handleClick()}>Add a Period</button>
		);
	}
}

export default AddPeriod;
