import React, { Component } from 'react';
import { Provider, createStore } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';


class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.store = createStore()		;
	}

	render() {
		return (
			<Provider store={}>
				
			</Provider>
		)		
	}
}
