import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showDialog, hideDialog, actionFetchUsers, actionDeleteUser } from '../../../actions';
import { v4 } from 'uuid';

class User extends Component {
    constructor(props) {
        super(props);

    }

    ask(user) {
      const _user = this;
      const dialogId = v4();
      const buttons = [
        {
          text: 'Да',
          handler(e) {
            _user.props.actionDeleteUser(user.user_id);
          }
        }, {
          text: 'Нет'
        }
      ];
      this.props.showDialog({
        title: 'Удаление пользователя',
        content: `Удалить пользователя ${this.props.user.last_name} ${this.props.user.first_name} ${this.props.user.patronymic} (${this.props.user.username})?`,
        buttons,
        id: dialogId
      })
    }

    render() {
       return (
        <tr className="user-table__item">
          <td className="username">{this.props.user.username}</td>
          <td className="name">
            {`${this.props.user.last_name} ${this.props.user.first_name} ${this.props.user.patronymic}`}
          </td>
          <td className="actions">
            <Link to={`/users/edit/${this.props.user.user_id}`} className="edit glyphicon glyphicon-edit" />
            <span className="delete glyphicon glyphicon-remove" onClick={this.ask.bind(this, this.props.user)}></span>
          </td>
        </tr>
       )
    }

}

const mapDispatchToProps = {
  showDialog,
  hideDialog,
  actionFetchUsers,
  actionDeleteUser
};

const mapStateToProps = state => ({
  dialogs: state.dialogs
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
