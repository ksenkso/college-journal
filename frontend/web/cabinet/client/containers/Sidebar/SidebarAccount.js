import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showDialog, hideDialog } from '../../actions';

class SidebarAccount extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="sidebar__account">
				<div className="personal">
					<div className="avatar" style={{backgroundImage: `url(${this.props.account.avatar})`}}></div>
					<div className="name">{`${this.props.account.first_name} ${this.props.account.last_name}`}</div>
				</div>
				<div className="settings">Настройки</div>
        <div className="logout">
          <a href="/auth/logout">Выход</a>
        </div>
			</div>
		)		
	}
}

const mapStateToProps = (state) => ({
	account: state.account
});

export default connect(mapStateToProps)(SidebarAccount);
