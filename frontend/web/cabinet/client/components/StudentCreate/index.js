/**
 * Created by yazun on 10.12.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudents, createStudent, setActiveModel } from '../../actions'
import ModelEditorFactory from '../ModelEditorFactory';

class StudentCreate extends Component {
  constructor(props) {
    super(props);
    this.names = {
      first_name: 'Имя',
      last_name: 'Фамилия',
      patronymic: 'Отчество',
      address: 'Адрес',
      phone: 'Телефон',
    };
    this.requiredFields = {
      first_name: true,
      last_name: true,
      patronymic: false,
      address: true,
      phone: true,
    };
    this.types = {
      first_name: ['text'],
      last_name: ['text'],
      patronymic: ['text'],
      address: ['text'],
      phone: ['text'],
    };
  }

  afterSubmit() {
    this.props.router.push('/students');
  }

  componentWillMount() {
    this.props.fetchStudents();
    this.props.setActiveModel({meta: [], names: this.names});
  }

  componentDidUpdate() {

    this.props.setActiveModel({fields: {}, names: this.names});
  }

  render() {

    return (
      <ModelEditorFactory
        modelName="Студент"
        names={this.names}
        rules={{}}
        required={this.requiredFields}
        canAddMeta={true}
        mode='create'
        types={this.types}
        submitCallback={this.props.createStudent}
        afterSubmit={this.afterSubmit.bind(this)}
      />
    )
  }

}

const mapStateToProps = (state) => ({
  currentStudent: state.currentStudent,
  groups: state.groups
});

export default connect(mapStateToProps, { fetchStudents, createStudent, setActiveModel })(StudentCreate);
