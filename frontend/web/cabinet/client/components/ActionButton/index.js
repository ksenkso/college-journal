import React, { Component } from 'react';

export default class ActionButton extends Component {
	constructor(props) {
		super(props);
		this.type = this.props.type;
		this.onClick = this.props.onClick;
		this.text = this.props.type;
		switch(this.type) {
			case 'save':
				this.className = 'action-btn --primary';
				break;
			case 'delete':
				this.className = 'action-btn --deny';
				break;
		}
	}

	render() {
		return (<button 
					type="button" className="btn btn-primary"
					onClick={this.onClick.bind(this)}
					>
					{this.props.children}
				</button>)
	}
}
