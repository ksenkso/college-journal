import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { changeTitle, actionFetchUsers, fetchGroups } from '../../actions';
import User from './components/User';

class UserList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.fetchGroups();
      this.props.actionFetchUsers();
    }

    componentDidMount() {
      this.props.changeTitle('Список пользователей');
    }

    render() {
       return (
         <div className="users">
           <table className="user-table">
             <thead>
             <tr>
               <td>Имя пользователя</td>
               <td>ФИО</td>
               <td>Действие</td>
             </tr>
             </thead>
             <tbody>
             {this.props.users.ids.map(id => <User user={this.props.users.byId[id]} />)}
             </tbody>
           </table>
           <Link to='/create-user'>Добавить пользователя</Link>
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
    users: state.users,
    title: state.title
});

const mapDispatchToProps = {
  changeTitle, actionFetchUsers, fetchGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
