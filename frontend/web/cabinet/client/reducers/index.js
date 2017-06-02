import { combineReducers } from 'redux';
import * as actions from '../actions';
import { getDates, deleteFromModel } from '../helpers';

const dialogs = (state = [], action) => {
	switch(action.type) {
		case actions.SHOW_DIALOG:
			return [...state, action.dialog];
			break;
		case actions.HIDE_DIALOG:
			return state.filter(e => e.id !== action.id);
			break;
		default:
			return state;
	}
};
const calendar = (state = {}, action) => {
  switch (action.type) {
    case actions.CALENDAR_CHANGE_MONTH:
      return {
        ...state,
        currentMonth: action.month,
        currentDays: getDates(state.currentYear, action.month + 1),
      };
      break;
    case actions.CALENDAR_CHANGE_YEAR:
      return {
        ...state,
        currentYearIndex: action.yearIndex,
        currentYear: state.years[action.yearIndex],
        currentDays: getDates(state.years[action.yearIndex], state.currentMonth + 1),
      };
      break;
    case actions.CALENDAR_DISPATCH_EVENTS:
      console.log(action);
      return {
        ...state,
        currentEvents: action.events
      };
      break;
    case actions.CALENDAR_SELECT_DAY:

      return {
        ...state,
        selectedDate: action.date
      };
    default: return state;
  }
};
const currentEvents = (state = {}, action) => {
  switch (action.type) {
    case actions.CALENDAR_SHOW_POPUP:

  }
};
const menuItems = (state = [], action) => {
	switch(action.type) {
		case actions.ADD_MENU_ITEM:
			return [...state, action.item];
			break;
		case actions.REMOVE_MENU_ITEM:
			return state.filter(e => e.id !== action.id);
			break;
		default:
			return state;
	}
};
const account = (state = {}, action) => {
	switch(action.type) {
		case actions.UPDATE_ACCOUNT:
			return action.account;
			break;
		default:
			return state;
	}
};
const title = (state = 'Главная', action) => {
	if (action.type === actions.TITLE_CHANGE) {
	  console.log(action.title);
	  return action.title || state;
  } else return state;
};

const specs = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_SPECS:
      return action.specs;
      break;
    default:
      return state;
  }
};
const groups = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_GROUPS: {
      console.log(action);
      return action.groups;
    }
    case actions.UPDATE_GROUP: {
      if (~state.ids.indexOf(action.group.group_id)) {
        state.byId[action.group.group_id] = action.group;
        return state;
      } else {
        return {byId: state.byId, ids: state.ids.concat([action.group.group_id])};
      }
    }
    case actions.DELETE_GROUP: {
      return deleteFromModel(action.groupId, state);
    }
    default: return state;
  }
};
const students = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_STUDENTS_STATE:
      return action.students;
    case actions.DELETE_STUDENT: {

      return deleteFromModel(action.studentId, state);

      /*const byId = {};
      Object.keys(state.byId).forEach(key => action.studentId !== key ? byId[key] = state.byId[key] : null);
      return Object.assign(
        {},
        { byId },
        {ids: state.ids.filter(id => action.studentId != id)}
      );*/
    }
    default: return state;
  }
};
const currentStudent = (state = {}, action) => {
  if (action.type == actions.EDIT_STUDENT) {
    return action.student;
  } else return state;
};
const activeModel = (state = {}, action) => {
  if (action.type === actions.SET_ACTIVE_MODEL) {

    return Object.assign(
      {},
      {fields: state.fields},
      action.activeModel,
      {meta: (action.activeModel.fields && action.activeModel.fields.meta) || action.activeModel.meta || state.meta || []}
    );
  } else return state;
};
const queries = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_QUERY: {
      return [...state, action.query];
    }
    case actions.REMOVE_QUERY: {
      return state.filter(query => query.id !== action.queryId);
    }
    default: return state;
  }
};
const loaders = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_LOADER: {
      return {state, [action.loader.queryId]: action.loader.loaderId}
    }
    case actions.REMOVE_LOADER: {
      const loadersArray =  Object.keys(state).filter(query => state[query] !== action.loaderId);
      let newState = {}, i = 0;
      for (; i < loadersArray.length; i++) {
        newState[loadersArray[i]] = state[loadersArray[i]];
      }
      return newState;
    }
    default: return state;
  }
};
const posts = (state = {byId: {}, ids: []}, action) => {
  switch (action.type) {
    case actions.UPDATE_POSTS: {
      return action.posts;
    }
    case actions.UPDATE_POST: {
      const newState = Object.assign({}, state.byId, {[action.post.post_id]: action.post});
      return Object.assign({}, state, {byId: newState});
    }
    case actions.CREATE_POST: {
      return Object.assign(
        {},
        Object.assign({}, state.byId, {[action.post.post_id]: action.post}),
        {ids: state.ids.slice(0).concat([action.post.post_id])}
      );
    }
    case actions.DELETE_POST: {
      return deleteFromModel(action.postId, state);
    }
    default: return state;
  }
};
const ready = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_READY: {
      return Object.assign({}, state, {[action.key]: true});
    }
    case actions.SET_NOT_READY: {
      return Object.assign({}, state, {[action.key]: false});
    }
    default: return state;
  }
};
const dTypes = (state = {byId: {}, ids: []}, action) => {
  switch (action.type) {
    case actions.GET_DTYPES: {
      return action.dtypes;
    }
    default: return state;
  }
}
/**
 * Reducers for admin part of app
 */
const users = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_USERS: {
      return action.users;
    }
    case actions.DELETE_USER: {
      const newState = {};

    }
    default: return state;
  }

};


export const adminReducer = combineReducers({ users, groups, menuItems, account, title, dialogs, specs, activeModel, ready });
const rootReducer = combineReducers({dialogs, account, menuItems, title, calendar, specs, groups, students, currentStudent, activeModel, queries, posts, ready, dTypes});
export default rootReducer;
