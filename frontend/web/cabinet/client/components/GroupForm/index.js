import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGroups, changeTitle } from '../../actions';

class GroupForm extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.fetchGroups();
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
          this.props.fetchGroups();
          location.hash = "#/";
        }
      })
    }

    componentDidUpdate() {
      const group = this.props.edit && this.props.groups.byId[this.props.params.groupId];
      const title = this.props.edit ? `Изменить группу ${group && group.name}` : `Добавить группу`;
      this.props.changeTitle(title);
    }

    render() {
      const group = this.props.edit && this.props.groups.byId[this.props.params.groupId];
       return (
         <div className="editor">
           <form action={this.props.edit ? `/api/private/groups/${this.props.params.groupId}` : "/api/private/groups"} ref={form => this.form = form}>
             <fieldset>
               <label htmlFor="name">Название</label>
               <input type="text" name="name" id="name" value={group && group.name}/>
             </fieldset>
             <button type="submit">Отправить</button>
           </form>
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
  groups: state.groups,
  title: state.title
});

const mapDispatchToProps = {
  fetchGroups,
  changeTitle
};

GroupForm = connect(mapStateToProps, mapDispatchToProps)(GroupForm);
export default GroupForm;

export class EditGroup extends Component {
    constructor(props) {
        super(props);

    }

    render() {
       return (
        <GroupForm edit={true} params={this.props.params} />
       )
    }

}
