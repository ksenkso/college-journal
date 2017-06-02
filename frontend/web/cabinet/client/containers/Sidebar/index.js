import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showDialog, hideDialog, toggleSidebar } from '../../actions';
import SidebarToggle from '../../components/SidebarToggle';
import SidebarAccount from './SidebarAccount.js'
import SidebarMenu from './SidebarMenu.js'
import uuid from 'uuid';

class Sidebar extends Component {
	constructor(props) {
		super(props);

    for (let item of this.props.menuItems) {
      item.onClick = this.hideSidebar.bind(this);
      if (item.submenu) {
        for (let submenuItem of item.submenu) {
          submenuItem.onClick = this.hideSidebar.bind(this);
        }
      }
    }
	}

	componentDidMount() {
		this.overlay = $('.overlay.overlay__sidebar');
		if (!this.overlay.length) {
			this.overlay = $('<div></div>', {class: 'overlay overlay__sidebar'});
			$('body').append(this.overlay);
		}
	}

	hideSidebar() {
		this.overlay.fadeOut();
		const sidebar = $(this.refs.element);
		let self = this;
		sidebar.animate({
			left: -sidebar.width()
		}, {
			done() {
				self.props.toggleSidebar(false);
			}
		});
	}

	render() {
		return (
			<aside className="sidebar" ref="element">
				<i onClick={this.hideSidebar.bind(this)} class="sidebar__toggle material-icons">keyboard_arrow_left</i>
				<SidebarAccount />
				<SidebarMenu>
					{this.props.menuItems}
				</SidebarMenu>
			</aside>
		)		
	}
}

const mapStateToProps = (state) => ({
	menuItems: state.menuItems
});

export default connect(mapStateToProps, {toggleSidebar})(Sidebar);
