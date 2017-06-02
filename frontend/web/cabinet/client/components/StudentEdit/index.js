/**
 * Created by yazun on 10.12.2016.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchGroups, updateStudent, setActiveModel, fetchStudents } from '../../actions'
import ModelEditorFactory from '../ModelEditorFactory';
import Loader from '../Loader';

class StudentEdit extends Component {

    constructor(props) {
        super(props);
        this.isReady = false;
        this._names = {
          s_first_name: 'Имя',
          s_last_name: 'Фамилия',
          s_patronymic: 'Отчество',
          s_address: 'Адрес',
          s_phone: 'Телефон',
        };
        this._rules = {};
        this._required = {
          s_first_name: true,
          s_last_name: true,
          s_patronymic: true,
          s_address: true,
          s_phone: true,
          s_group_id: true,
        };
        this._types = {
          s_first_name: ['text'],
          s_last_name: ['text'],
          s_patronymic: ['text'],
          s_address: ['text'],
          s_phone: ['text'],
          s_group_id: ['hidden'],
        };
    }

    afterSubmit() {
      this.props.router.push('/students');
    }

    static propTypes = {
      params: PropTypes.shape({
        id: PropTypes.string
      })
    };

    componentWillMount() {
      this.props.fetchStudents();
    }

    loadStudent() {
      if (!this.props.ready.students) {
      }
    }

    checkReady() {
      if (!this.isReady && this.props.ready.students) {
        this.props.setActiveModel({
          fields: this.props.students.byId[+this.props.params.id],
          names:  this._names
        });
        this.isReady = true;
      }
    }

  componentDidUpdate() {
    this.checkReady();
  }

  render() {
      if (this.isReady) console.log(this.props.params);
     return !this.isReady ? <Loader /> : (
      <ModelEditorFactory
        modelId={['s_student_id', +this.props.params.id]}
        modelName="Студент"
        names={this._names}
        rules={this._rules}
        required={this._required}
        canAddMeta={true}
        mode="update"
        types={this._types}
        submitCallback={this.props.updateStudent}
        afterSubmit={this.afterSubmit.bind(this)}
      />
     )
  }

}

const mapStateToProps = (state) => ({
  activeModel: state.activeModel,
  groups: state.groups,
  students: state.students,
  ready: state.ready
});

export default connect(mapStateToProps, { fetchGroups, updateStudent, setActiveModel, fetchStudents })(StudentEdit);
