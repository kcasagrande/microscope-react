import React, { Component } from 'react';

import './BigPicture.css';

class BigPicture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focused: false
		};
	}

	focus() {
		this.setState({
			focused: true
		});
	}

	blur() {
		this.setState({
			focused: false
		});
	}

	handleChange(event) {
		this.props.updateParent(event.target.value);
	}

	render() {
		return (
			<input className={'bigPicture ' + (this.state.focused ? 'focused' : '')} type="text" onFocus={() => this.focus()} onBlur={() => this.blur()} value={this.props.title} onChange={(event) => this.handleChange(event)} />
		);
	}
}

export default BigPicture;
