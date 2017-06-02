import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups, actionFetchUsers, changeTitle } from '../../actions';

class UserForm extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.fetchGroups();
      this.props.actionFetchUsers();
      console.log('will');
    }

    componentDidMount() {

      let self = this;
      const form = $(this.form);
      console.log(this.form);
      form.on('submit', e => {
        e.preventDefault();
        let data = {};
        form.serializeArray().map(input => data[input.name] = input.value);
        $.ajax({
          url: form.attr('action'),
          type: this.props.edit ? 'PUT': 'POST',
          data: {user: data},
          success() {
            self.props.actionFetchUsers();
            location.hash = "#/";
          }
        })
      })
    }

    submit(e) {
      e.preventDefault();
      const form = $(this.form);
      let data = {};
      form.serializeArray().map(input => data[input.name] = input.value);
      $.ajax({
        url: form.attr('action'),
        type: this.props.edit ? 'PUT': 'POST',
        data: {user: data},
        success() {
          this.props.actionFetchUsers();
          location.hash = "#/";
        }
      })
    }

    componentDidUpdate() {
      const user = this.props.edit && this.props.users.byId[this.props.params.userId];
      const title = this.props.edit ? `Изменить пользователя ${user && user.username}` : `Добавить пользователя`;
      this.props.changeTitle(title);
    }

    render() {
      const user = this.props.edit && this.props.users.byId[this.props.params.userId];
       return (
         <div className="editor">
           <form action={this.props.edit ? `/api/private/users/${this.props.params.userId}` : "/api/private/users"} ref={form => this.form = form}>
             <fieldset>
               <label htmlFor="username">Имя пользователя</label>
               <input type="text" name="username" id="username" value={user && user.username}/>
             </fieldset>
             <fieldset>
               <label htmlFor="password">Пароль</label>
               <input type="password" name="password" id="password" />
             </fieldset>
             <fieldset>
               <label htmlFor="last_name">Фамилия</label>
               <input type="text" name="last_name" id="last_name" value={user && user.last_name} />
             </fieldset>
             <fieldset>
               <label htmlFor="first_name">Имя</label>
               <input type="text" name="first_name" id="first_name" value={user && user.first_name}/>
             </fieldset>
             <fieldset>
               <label htmlFor="patronymic">Отчество</label>
               <input type="text" name="patronymic" id="patronymic" value={user && user.patronymic} />
             </fieldset>
             {(this.props.users.byId[+this.props.params.userId] && this.props.users.byId[+this.props.params.userId].group_id) || (!this.props.edit) ? (
               <fieldset>
                 <label htmlFor="group_id">Группа</label>
                 <select name="group_id" id="group_id" defaultValue={user && user.group_id}>
                   {
                     this.props.groups.ids.map((e, i) => {
                       const group = this.props.groups.byId[e];
                       if (group && !group.placed) {
                          return (<option key={i} value={group.group_id}>{group.name}</option>);
                       }
                     })
                   }
                 </select>
               </fieldset>
             ) : ""}
             <button type="submit">Отправить</button>
           </form>
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
  users: state.users,
  groups: state.groups,
  title: state.title
});

const mapDispatchToProps = {
  fetchGroups,
  actionFetchUsers,
  changeTitle
};

UserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm);
export default UserForm;

export class EditUser extends Component {
    constructor(props) {
        super(props);

    }

    render() {
       return (
        <UserForm edit={true} params={this.props.params} />
       )
    }

}
