import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionButton from '../ActionButton';
import { hideDialog } from '../../actions';
import { DialogHeader, DialogFooter, DialogContent } from './components';


class Dialog extends Component {
	
	constructor(props) {
		super(props);
		this.id = this.props.dialogId;
    this.props.buttons[this.props.buttons.length - 1].handler = this.closeDialog.bind(this);
    this.buttons = this.props.buttons.map((e, i) => (<ActionButton onClick={e.handler} key={i}>{e.text}</ActionButton>));

	}

	componentDidMount() {
		$('.dialog__overlay').height($('body').height()).fadeIn();
		$(this.refs.element).fadeIn();
	}


	closeDialog() {
		if (this.props.dialogs.length === 1) {
			$('.dialog__overlay').fadeOut(function() {
				$(this).removeClass('show')
			});
		}
		$(this.refs.element).fadeOut(() => {	
			this.props.hideDialog(this.id)
		});
	}

	render() {
		return (
			<div class="dialog" ref="element" id={this.props.dialogId}>
				<DialogHeader 
					title={this.props.title}
				/>
				<DialogContent>
					{this.props.children}
				</DialogContent>
				<DialogFooter 
					buttons={this.buttons}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	dialogs: state.dialogs
});

const mapDispatchToProps = {
	hideDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
