import React, { Component } from 'react';

class Content extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<main className="content">
				{this.props.children}
			</main>
		)	
	}
}

export default Content;
