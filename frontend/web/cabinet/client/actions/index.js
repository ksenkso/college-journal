import { hashHistory } from 'react-router';

/**
 *
 * CONSTANTS
 */


// dialog
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const HIDE_DIALOG = 'HIDE_DIALOG';
// menu
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const REMOVE_MENU_ITEM = 'REMOVE_MENU_ITEM';
// account
export const FETCH_ACCOUNT = 'FETCH_ACCOUNT';
// sidebar
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR';
// title
export const TITLE_CHANGE = 'TITLE_CHANGE';
// calendar
export const CALENDAR_CHANGE_MONTH = 'CALENDAR_CHANGE_MONTH';
export const CALENDAR_CHANGE_YEAR = 'CALENDAR_CHANGE_YEAR';
export const CALENDAR_SELECT_DAY = 'CALENDAR_SELECT_DAY';
export const CALENDAR_SHOW_POPUP = 'CALENDAR_SHOW_POPUP';
export const CALENDAR_DISPATCH_EVENTS = 'CALENDAR_DISPATCH_EVENTS';
// document types
export const GET_DTYPES = 'GET_DTYPES';
export const CREATE_DTYPE = 'CREATE_DTYPE';
export const UPDATE_DTYPE = 'UPDATE_DTYPE';
export const DELETE_DTYPE = 'DELETE_DTYPE';
// models
export const SET_ACTIVE_MODEL = 'SET_ACTIVE_MODEL';
// users
export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';
// groups
export const CHANGE_GROUPS = 'CHANGE_GROUPS';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const CREATE_GROUP = 'CREATE_GROUP';
// specs
export const UPDATE_SPECS = 'UPDATE_SPECS';
// students
export const UPDATE_STUDENTS_STATE = 'UPDATE_STUDENTS_STATE';
export const UPDATE_STUDENT_STATE = 'UPDATE_STUDENT_STATE';
export const EDIT_STUDENT = 'EDIT_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
// account
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
// queries
export const ADD_QUERY = 'ADD_QUERY';
export const REMOVE_QUERY = 'REMOVE_QUERY';
export const SET_READY = 'SET_READY';
export const SET_NOT_READY = 'SET_NOT_READY';

// posts
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_POST = 'CREATE_POST';
// loaders
export const ADD_LOADER = 'ADD_LOADER';
export const REMOVE_LOADER = 'REMOVE_LOADER';

/**
 * ACTIONS FOR THE MAIN PART OF THE APP
 */
// title
export const changeTitle = (title) => ({
  type: TITLE_CHANGE,
  title
});

// sidebar toggle
export const toggleSidebar = (visible) => ({
  type: SHOW_SIDEBAR,
  visible
});

// dialogs


/**
 * @typedef {{text: String, handler: Function}} Button
 * @param {Object} dialog
 * @param {String} dialog.title
 * @param {XML} dialog.content
 * @param {{title: String, handler: Function}[]} dialog.buttons
 * @param {String} dialog.id
 */
export const showDialog = (dialog) => ({
	type: SHOW_DIALOG,
	dialog
});
export const hideDialog = (id) => (dispatch, getState) => {
  const dialogs = getState().dialogs;
  if (dialogs.length === 1) {
    $('.dialog__overlay').fadeOut(function() {
      $(this).removeClass('show')
    });
  }
  $(`#${id}`).fadeOut(() => {
    dispatch({
      type: HIDE_DIALOG,
      id
    })
  });

};

// calendar actions
export const calendarSelectDay = (year, month, day, node) => {
  $('.calendar__date.selected').removeClass('selected');
  $(node).addClass('selected');
  return {
    type: CALENDAR_SELECT_DAY,
    date: + new Date(year, month, day)
  }
};
const calendarDispatchEvents = (events) => ({
  type: CALENDAR_DISPATCH_EVENTS,
  events
});
export const calendarShowPopup = (events) => (dispatch, getState) => {
  $('.calendar__popup').animate({
    top: 0
  }, () => dispatch({
    type: CALENDAR_SHOW_POPUP,
    events
  }))
};
export const calendarChangeYear = (yearIndex) => (dispatch, getState) => {
  const year = getState().calendar.years[yearIndex];
  const month = getState().calendar.currentMonth;
  dispatch(calendarFetchEvents(year, month));
  dispatch({
    type: CALENDAR_CHANGE_YEAR,
    yearIndex
  })
};
export const calendarChangeMonth = (month) => (dispatch, getState) => {
  const year = getState().calendar.currentYear;
  dispatch(calendarFetchEvents(year, month));
  dispatch({
    type: CALENDAR_CHANGE_MONTH,
    month
  });
};

// calendar events actions
export const calendarFetchEvents = (year, month) => (dispatch) => {
  const d = new Date();
  $.ajax({
    url: `/api/events/${Number(year) || d.getFullYear()}/${Number(month) || d.getMonth()}`,
    type: 'GET',
    success(response) {
      dispatch(calendarDispatchEvents(response));
    },
    error() {
      dispatch([]);
    }
  })
};
export const calendarDeleteEvent = (eventId) => (dispatch, getState) => {
  //const { currentYear, currentMonth } = getState().calendar;
  $.ajax({
    url: `/api/events/delete/${eventId}`,
    type: 'DELETE',
    success(res) {
      dispatch(calendarDispatchEvents(res));
    }
  })
};
export const calendarPostEvent = (event, dialogId) => (dispatch, getState) => {
  const { currentYear, currentMonth } = getState().calendar;
  $.ajax({
    type: 'POST',
    url: `/api/events/${currentYear}/${currentMonth}`,
    data: event,
    success(events) {
      dispatch(calendarDispatchEvents(events));
      dispatch(hideDialog(dialogId));
    },
    error(e) {
      console.error(e);
      dispatch(calendarDispatchEvents(getState().calendar.currentEvents));
    }
  })
};
export const calendarEditEvent = (event, dialogId) => (dispatch, getState) => {
  const { currentYear, currentMonth } = getState().calendar;
  $.ajax({
    type: 'PUT',
    url: `/api/events/${currentYear}/${currentMonth}/${event.event_id}`,
    data: event,
    success(events) {
      dispatch(calendarDispatchEvents(events));
      dispatch(hideDialog(dialogId));
    },
    error(e) {
      console.error(e);
      dispatch(calendarDispatchEvents(getState().calendar.currentEvents));
    }
  })
};

// document types
const updateDTypesState = (dtypes) => ({
  type: GET_DTYPES,
  dtypes
});
export const getDocumentTypes = () => (dispatch) => {
  dispatch(setNotReady('dTypes'));
  $.get({
    url: '/api/public/dtypes',
    success(res) {
      dispatch(updateDTypesState(res));
      dispatch(setReady('dTypes'));
    }
  })
};

// models
export const setActiveModel = (activeModel) => ({
  type: SET_ACTIVE_MODEL,
  activeModel
});

// groups
const updateGroupsState = (groups = []) => ({
  type: CHANGE_GROUPS,
  groups
});
const updateGroupState = (group = {}) => ({
  type: UPDATE_GROUP,
  group
});
const stateDeleteGroup = (groupId) => ({
  type: DELETE_GROUP,
  groupId
});
//const stateCreateGroup = (group) => ({})
export const fetchGroups = () => (dispatch, getState) => {
  $.ajax({
    url: '/api/public/groups',
    type: 'GET',
    success(res) {
      dispatch(updateGroupsState(res));
      dispatch(setReady('groups'));
    },
    error() {
      dispatch(updateGroupsState(getState().groups));
    }
  })
};
export const deleteGroup = (groupId, dialogId) => (dispatch, getState) => {
  console.log(groupId);
  $.ajax({
    url: `/api/private/groups/${groupId}`,
    type: 'DELETE',
    success(groupId) {
      dispatch(hideDialog(dialogId));
      dispatch(stateDeleteGroup(groupId));
      hashHistory.push('/groups');
    },
    error() {
      dispatch(updateGroupsState(getState().groups));
    }
  })
};
export const createGroup = (group) => (dispatch, getState) => {
  dispatch(setNotReady('groups'));
  $.ajax({
    type: 'POST',
    url: `/api/private/groups`,
    data: {
      group
    },
    success(res) {
      dispatch(updateGroupState(res));
      dispatch(setReady('groups'));
      hashHistory.push('/groups');
    },
    error() {
      dispatch(updateGroupsState(getState().groups));
    }
  })
};
export const updateGroup = (group) => (dispatch, getState) => {
  dispatch(setNotReady('groups'));
  $.ajax({
    type: 'PUT',
    url: `/api/private/groups`,
    data: {group},
    success(res) {
      dispatch(updateGroupState(res));
      dispatch(setReady('groups'));
      hashHistory.push('/groups');
    },
    error() {
      dispatch(updateGroupsState(getState().groups));
    }
  })
};

// specs
const updateSpecs = (specs = {}) => ({
  type: UPDATE_SPECS,
  specs
});
export const fetchSpecs = () => (dispatch, getState) => {
  $.ajax({
    type: 'GET',
    url: '/api/public/specs',
    success(specs) {
      dispatch(updateSpecs(specs));
      dispatch(setReady('specs'));
    },
    error(err) {
      console.error(err);
      dispatch(updateSpecs(getState().specs))
    }
  })
};
const createSpec = (spec) => (dispatch, getState) => {
  $.ajax({
    type: 'POST',
    url: '/apu/public/specs',
    data: {spec},
    success(specs) {
      dispatch(updateSpecs(specs));
    },
    error(err) {
      console.error(err);
      dispatch(updateSpecs(getState().specs))
    }
  })
};
const updateSpec = (spec) => (dispatch, getState) => {
  $.ajax({
    type: 'PUT',
    url: `api/public/specs/${spec.spec_id}`,
    data: {spec},
    success(specs) {
      dispatch(updateSpecs(specs));
    },
    error(err) {
      console.error(err);
      dispatch(updateSpecs(getState().specs))
    }
  })
}

// students
export const setCurrentStudent = (student) => ({
  type: EDIT_STUDENT,
  student
});
const updateStudentsState = (students = {}) => ({
  type: UPDATE_STUDENTS_STATE,
  students
});
const deleteStudentFromState = (studentId) => ({
  type: DELETE_STUDENT,
  studentId
});
const updateStudentState = (student = {}) => ({
  type: UPDATE_STUDENT_STATE,
  student
});
export const fetchStudents = () => (dispatch, getState) => {
  dispatch(setNotReady('students'));
  $.ajax({
    type: 'GET',
    url: `/api/public/students`,
    success(res) {
      dispatch(updateStudentsState(res));
      dispatch(setReady('students'));
    },
    error() {
      dispatch(updateStudentsState(getState().students));
    }
  })
};
export const updateStudent = ({result, cb}) => (dispatch, getState) => {
  $.ajax({
    type: 'PUT',
    url: `/api/public/students/${student.s_student_id}`,
    data: {student: result},
    success(res) {
      dispatch(updateStudentsState(res));
      cb(res);
    },
    error(err) {
      console.error(err);
      dispatch(updateStudentsState(getState().students));
    }
  })
};
export const createStudent = ({result, cb}) => (dispatch, getState) => {
  $.ajax({
    type: 'POST',
    url: `/api/public/students`,
    data: {student: result},
    success(res) {
      dispatch(updateStudentsState(res));
      cb(res);
    },
    error(err) {
      console.error(err);
      dispatch(updateStudentsState(getState().students));
    }
  })
};
export const deleteStudent = (studentId) => (dispatch, getState) => {
  $.ajax({
    type: 'DELETE',
    url: `/api/public/students/${studentId}`,
    success(res) {
      dispatch(deleteStudentFromState(studentId));
      //dispatch(updateStudentsState(res));
    },
    error(err) {
      console.error(err);
      dispatch(updateStudentsState(getState().students));
    }
  })
};

// loaders
export const addLoader = (loaderId, queryId) => ({
  type: ADD_LOADER,
  loader: {queryId, loaderId}
});
export const removeLoader = (loaderId) => ({
  type: REMOVE_LOADER,
  loaderId
});

// queries
export const addQuery = (queryId, loaderId) => (dispatch, getState) => {
  dispatch(addLoader(loaderId, queryId));
  return {
    type: ADD_QUERY,
    query
  }
};
export const removeQuery = (queryId) => (dispatch, getState) => {
  dispatch(removeLoader(getState().loaders[queryId]));
  return {
    type: REMOVE_QUERY,
    queryId
  }
};
const setReady = (key) => ({
  type: SET_READY,
  key
});
const setNotReady = (key) => ({
  type: SET_NOT_READY,
  key
});

// account actions
const updateAccountState = (account) => ({
  type: UPDATE_ACCOUNT,
  account
});
export const getAccount = () => (dispatch, getState) => {
  $.ajax({
    url: '/api/account',
    type: 'GET',
    success(res) {
      dispatch(updateAccountState(res[0]));
    },
    error(err) {
      dispatch(updateAccountState(getState().account));
    }
  })
};

// posts actions
const actionUpdatePosts = (posts) => ({
  type: UPDATE_POSTS,
  posts
});
const actionUpdatePost = (post) => ({
  type: UPDATE_POST,
  post
});
const actionCreatePost = (post) => ({
  type: CREATE_POST,
  post
});
const actionDeletePost = (postId) => ({
  type: DELETE_POST,
  postId
});

export const getPosts = (limit) => (dispatch, getState) => {
  $.ajax({
    url: `/api/public/posts/${limit}`,
    type: "GET",
    success(posts) {
      dispatch(actionUpdatePosts(posts));
    },
    error(err) {
      // TODO: create error handling actions
    }
  })
};
export const createPost = (post) => (dispatch, getState) => {
  $.ajax({
    url: `/api/public/posts/`,
    type: "POST",
    data: {post},
    success(newPost) {
      dispatch(actionCreatePost(newPost));
    },
    error(err) {
      // TODO: create error handling actions
    }
  })
};
export const updatePost = (post) => (dispatch, getState) => {
  $.ajax({
    url: `/api/public/posts/`,
    type: "PUT",
    data: {post},
    success(newPost) {
      dispatch(actionUpdatePost(newPost));
    },
    error(err) {
      // TODO: create error handling actions
    }
  })
};
export const deletePost = (postId) => (dispatch, getState) => {
  $.ajax({
    url: `/api/public/posts/`,
    type: "PUT",
    data: { postId },
    success(postId) {
      dispatch(actionDeletePost(postId));
    },
    error(err) {
      // TODO: create error handling actions
    }
  })
};
/**
 * ACTIONS FOR THE ADMIN PART OF THE APP
 */

// users
const changeUsers = (users = []) => ({
  type: GET_USERS,
  users
});
const updateUser = (user = {}) => ({
  type: UPDATE_USER,
  user
});
const createUser = (user) => ({
  type: CREATE_USER,
  user
});
const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId
});
export const fetchUser = (id) => (dispatch, getState) => {
  $.ajax({
    url: '/api/private/user' + id,
    type: 'GET',
    success(res) {
      console.log('hello');
      dispatch(updateUser(res));
    },
    error() {
      dispatch(changeUsers(getState().users));
    }
  })
};
export const actionFetchUsers = () => (dispatch, getState) => {
  $.ajax({
    url: '/api/private/users',
    type: 'GET',
    success(res) {
      dispatch(changeUsers(res));
    },
    error() {
      dispatch(changeUsers(getState().users));
    }
  })
};
export const actionDeleteUser = (userId) => (dispatch, getState) => {
  dispatch(setNotReady('users'));
  $.ajax({
    type: 'DELETE',
    url: `/api/private/users/${userId}`,
    success(userId) {
      dispatch(actionDeleteUser(userId));
      dispatch(setReady('users'));
    },
    error(err) {
      console.error(err);
    }
  });
}


