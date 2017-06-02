import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { setActiveModel, deleteStudent } from '../../../actions';

/**
 * @class
 * @member {Object} props
 */
class Student extends Component{
   constructor(props) {
     super(props);
   }

   ask() {
     if (confirm('Удалить этого студента из списка группы?')) {
       this.props.deleteStudent(this.props.student.s_student_id);
     }
   }

  render() {
    return (
      <tr className="students-list__row">
        <td className="students-list__col">
          {this.props.studentNumber}
        </td>
        <td className="students-list__col">
          {`${this.props.student.s_last_name} ${this.props.student.s_first_name} ${this.props.student.s_patronymic}`}
          </td>
        <td className="students-list__col">
          {this.props.student.s_phone}
        </td>
        <td className="students-list__col">
          {this.props.student.s_address}
        </td>
        <td className="students-list__col">
          {
            this.props.student.meta
              .map(metaField => `${metaField.m_meta_name}: ${metaField.m_meta_value}`).join('\n')
          }
          </td>
        <td className="students-list__col">
          <Link className="glyphicon glyphicon-edit" to={`/students/edit/${this.props.student.s_student_id}`}/>
          <span onClick={this.ask.bind(this)} className="glyphicon glyphicon-remove"></span>
        </td>
      </tr>
    )
  }
}



export default connect(null, { setActiveModel, deleteStudent })(Student);
