import React, { Component } from 'react';
import Dialog from 'dialog';

export default class Text extends Component {
	constructor(props) {
		super(props);
		this.buttons = [
			{
				text: 'save',
				handler(e) {
					console.log('DONE', e);
				}
			}, {
				text: 'delete',
				handler(e) {
					console.error('DELETED', e);
				}
			}
		];
	}

	render() {
		return (
			<Dialog buttons={this.buttons}>
				<div className="test">Hello World</div>		
			</Dialog>
		)		
	}
}

React.render(<Text/>, document.getElementById('root'));
