import React, { Component } from 'react';

export class DialogHeader extends Component {
	constructor(props) {
		super(props);
		this.button = this.props.closeButton ? (<div onClick={this.props.close} className="header__close-dialog"></div>) : false;
	}

	render() {
		return (
			<div className="dialog__header">
				<div className="header__text">{this.props.title || 'Message'}</div>
				{this.button || ''}
			</div>
		)		
	}
}

export class DialogFooter extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dialog__footer">
				{this.props.buttons}
			</div>
		)		
	}
}

export class DialogContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dialog__content">
				{this.props.children}
			</div>
		)		
	}
}