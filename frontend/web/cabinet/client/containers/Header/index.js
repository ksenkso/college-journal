import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions';
import Sidebar from '../Sidebar';
import SidebarToggle from '../../components/SidebarToggle';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
    this.overlay = $('.overlay__sidebar');
    this.overlay.on('click', this.hideSidebar.bind(this));
  }

	hideSidebar() {
		this.overlay.fadeOut();
    const sidebar = $('.sidebar');
		let self = this;
		sidebar.animate({
			left: -sidebar.width()
		}, {
			done() {
				self.props.toggleSidebar(false);
			}
		});
	}

	showSidebar() {
		const sidebar = $('.sidebar');
		let self = this;
		console.log(sidebar);
		this.overlay.fadeIn();
		sidebar.animate({
			left: 0
		}, {
			done() {
				self.props.toggleSidebar(true);
			}
		})
	}

	render() {
		return (
			<header className="header">
				<Sidebar ref={sidebar => this.sidebar = sidebar} />
				<i onClick={this.showSidebar.bind(this)} className="sidebar__show material-icons">menu</i>
				<h2 className="header__title">{this.props.title}</h2>

			</header>
		)		
	}
}

const mapStateToProps = (state) => ({
	title: state.title
})

export default connect(mapStateToProps, {toggleSidebar})(Header);
