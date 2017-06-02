import 'styles/admin.scss';
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { adminReducer } from './reducers';
import uuid from 'uuid';
import Admin from './containers/Admin';
import UserForm, { EditUser } from './components/UserForm';
import UserList from './components/UserList';
import GroupForm, { EditGroup } from './components/GroupForm';
import GroupCreate from './components/GroupCreate';
import GroupEdit from './components/GroupEdit';
import GroupList from './components/GroupList';
import "bootstrap";

window.$ = $;
window.md5 = md5;

const store = createStore(adminReducer,
  {
  title: '',
  users: {
    byId: {},
    ids: []
  },
  groups: {
    byId: {},
    ids: []
  },
  specs: {
    byId: {},
    ids: []
  },
  account: {
    name: 'Ksenkso',
    avatar: 'hello.png'
  },
  menuItems: [
    {
      title: 'Список пользователей',
      onlyActiveOnIndex: true,
      action: '/users',
      itemId: uuid.v4(),
      submenu: [
        {
          title: 'Добавить пользователя',
          action: '/users/create',
          itemId: uuid.v4(),
        }
      ]
    },
    {
      title: 'Список групп',
      action: '/groups',
      itemId: uuid.v4(),
      submenu: [
        {
          title: 'Добавить группу',
          action: '/groups/create',
          itemId: uuid.v4(),
        }
      ]
    },
  ],
  dialogs: [],
  ready: {}
}, applyMiddleware(thunk));
window.store = store;

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Admin}>
        <IndexRoute component={UserList}></IndexRoute>
        <Route path="/users" component={UserList}></Route>
        <Route path="users/edit/:userId" component={EditUser}></Route>
        <Route path="users/create" component={UserForm}></Route>
        <Route path="/groups" component={GroupList}></Route>
        <Route path="groups/edit/:groupId" component={GroupEdit}></Route>
        <Route path="groups/create" component={GroupCreate}></Route>

      </Route>
    </Router>
  </Provider>
, document.getElementById('root'));
