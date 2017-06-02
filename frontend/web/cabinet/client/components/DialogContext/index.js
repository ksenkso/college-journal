import React, { Component } from 'react';
import { showDialog } from '../../actions';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Dialog from '../Dialog';

class DialogContext extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dialog-context">
				<div className="overlay dialog__overlay"></div>
				{this.props.dialogs.map(e => <Dialog title={e.title} buttons={e.buttons} key={e.id} dialogId={e.id}>{e.content}</Dialog>)}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	dialogs: state.dialogs
});

const mapDispatchToProps = {
	showDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogContext);