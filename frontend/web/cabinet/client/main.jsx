'use strict';


import 'styles/main.scss';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import rootReducer from './reducers';
import { getDates } from './helpers';

import App from './containers/App';
import StartPage from './components/StartPage';
import Calendar from './components/Calendar';
import GroupList from './components/GroupList';
import GroupForm from './components/GroupForm';
import StudentsList from './components/StudentsList';
import StudentEdit from './components/StudentEdit';
import StudentCreate from './components/StudentCreate';



import "bootstrap";
import uuid from 'uuid';

window.$ = jQuery.noConflict();
window.md5 = md5;
const currentDate = new Date();
const years = (() => {
  let years = 10,
    res = [],
    curYear = (new Date()).getFullYear();
  while (years--) {
    res.push(curYear - 5 + years)
  }
  return res.reverse();
})();
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  "Октябрь",
  'Ноябрь',
  'Декабрь'
];

window.store = createStore(
	rootReducer,
	{
		title: 'Главная',
		account: {
			name: 'Ksenkso',

			avatar: 'hello.png'
		},
    calendar: {
      currentYear: currentDate.getFullYear(),
      currentYearIndex: years.indexOf(currentDate.getFullYear()),
      currentMonth:  currentDate.getMonth(),
      currentDay: currentDate.getDay(),
      months,
      years,
      currentDays: getDates(currentDate.getFullYear(), currentDate.getMonth() + 1),
      events: {
        byId: {},
        ids: []
      },
      currentEvents: {
        byId: {},
        ids: []
      },
      popup: false,
      modalEvent: null,
      selectedDate: {}
    },
		menuItems: [
			{
				title: 'Главная',
                onlyActiveOnIndex: true,
				action: '/',
				itemId: uuid.v4()
			},
			{
				title: 'Календарь',
				action: '/calendar',
				itemId: uuid.v4()
			},
            {
                title: 'Журнал',
                action: ''
            },
          {
            title: 'Студенты',
            action: '/students',
            itemId: uuid.v4(),
            submenu: [
              {
                title: 'Добавить',
                action: '/students/create',
                itemId: uuid.v4()
              },
            ]
          },
		],
    groups: {
	    byId: {},
      ids: []
    },
    specs: {
      byId: {},
      ids: []
    },
    students: {
	    byId: {},
      ids: []
    },
    currentStudent: {},
    activeModel: {
	    fields: []
    },
    queries: [],
    ready: {}
	},
  applyMiddleware(thunk)
);

const buttons = [
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

render(<Provider store={window.store}>
        <Router history={hashHistory}>
				<Route path="/" component={App}>
          <IndexRoute component={StartPage}/>
					<Route path="/calendar" component={Calendar}/>
          <Route path="/students" component={StudentsList}/>
          <Route path="/students/edit/:id" component={StudentEdit}/>
          <Route path="/students/create" component={StudentCreate}/>
				</Route>				
        </Router>
		</Provider>
		, document.getElementById('root'));
