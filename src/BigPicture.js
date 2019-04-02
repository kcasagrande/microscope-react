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

	render() {
		return (
			<input className={'bigPicture ' + (this.state.focused ? 'focused' : '')} type="text" onFocus={() => this.focus()} onBlur={() => this.blur()} defaultValue={this.props.title} />
		);
	}
}

export default BigPicture;
