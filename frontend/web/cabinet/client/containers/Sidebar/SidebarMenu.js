import React, { Component } from 'react';
//import { connect } from 'react-redux';
import MenuItem from './MenuItem.js'


class SidebarMenu extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="sidebar__menu">
				<ul className="menu__container">
					{this.props.children.map(e => <MenuItem {...e} key={e.itemId} onClick={e.onClick} />)}
				</ul>
			</div>
		)		
	}
}

export default SidebarMenu;
