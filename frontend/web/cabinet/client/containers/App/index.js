import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTitle, getAccount } from '../../actions';
import Content from '../Content';
import DialogContext from '../../components/DialogContext';
import Header from '../Header';
import uuid from 'uuid';

class App extends Component {
	constructor(props) {
    super(props);
  }

  componentWillMount() {
	  //this.props.getAccount();
  }

  componentDidMount() {
		this.props.changeTitle("Главная");
	}

	render() {
		return (
			<div className="app">
				<Header />
				<Content>
					<DialogContext ref={(dialogContext) => this.dialogContext = dialogContext} />
					{this.props.children}
				</Content>				
			</div>
		)		
	}
}

const mapDispatchToProps = {
    changeTitle,
    getAccount
};

export default connect(null, mapDispatchToProps)(App);
