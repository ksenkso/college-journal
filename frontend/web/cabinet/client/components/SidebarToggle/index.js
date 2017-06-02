import React, { Component } from 'react';
import { connect } from 'react-redux';


class SidebarToggle extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div onClick={this.props.onClick} className="sidebar__show glyphicon glyphicon-remove"></div>
		)		
	}
}

export default SidebarToggle;