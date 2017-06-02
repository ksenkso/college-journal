import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showDialog, hideDialog, deleteGroup } from '../../../actions';
import { v4 } from 'uuid';

class Group extends Component {
    constructor(props) {
        super(props);

    }

    ask(group) {
      let _group = this;
      const dialogId = v4();
      const buttons = [
        {
          text: 'Да',
          handler(e) {
            _group.props.deleteGroup(_group.props.group.group_id, dialogId);
          }
        }, {
          text: 'Нет'
        }
      ];
      this.props.showDialog({
        title: 'Удаление группы',
        content: `Удалить группу ${this.props.group.name}?`,
        buttons,
        id: dialogId
      })
    }

    selectGroup(id) {

    }

    render() {
      console.log('group:', this.props.group);
       return (
        <tr className="group-table__item">
          <td className="name">{this.props.group.name}</td>

          <td className="actions">
            <Link
              onClick={this.selectGroup.bind(this, this.props.group.group_id)}
              to={`/groups/edit/${this.props.group.group_id}`}
              className="edit glyphicon glyphicon-edit"
            />
            <span className="delete glyphicon glyphicon-remove" onClick={this.ask.bind(this, this.props.group)}></span>
          </td>
        </tr>
       )
    }

}

const mapDispatchToProps = {
  showDialog,
  hideDialog,
  deleteGroup
};

const mapStateToProps = state => ({
  dialogs: state.dialogs
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
