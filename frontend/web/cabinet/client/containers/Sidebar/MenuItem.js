import React, { Component } from 'react';
import { Link } from 'react-router';
//import { connect } from 'react-redux';
import uuid from 'uuid';

class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.itemId = this.props.itemId;
	}

	onClick() {
		console.log(this.props);
		this.props.onClick();
  }

	render() {
		return (
			<li className="menu__item">
				<Link activeClassName={"item--active"} onlyActiveOnIndex={this.props.onlyActiveOnIndex} onClick={this.onClick.bind(this)} to={this.props.action}>{this.props.title}</Link>
				{this.props.submenu ? (<ul className="submenu">{this.props.submenu.map(e => <MenuItem {...e} key={uuid.v4()} />)}</ul>) : ''}
			</li>
		)		
	}

  onSubmenuClick() {
    return 0;
  }
}

export default MenuItem
