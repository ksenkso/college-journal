/**
 * Created by yazun on 10.12.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link'
import { changeTitle, fetchStudents } from '../../actions';
import Student from './components';

class StudentsList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.fetchStudents()
    }

    componentDidMount() {
      this.props.changeTitle(`Список студентов группы ${this.props.group}`);
    }

    render() {
       return (

         <div className="students-list__container">
           <Link to='/students/create' className="btn btn-primary">Добавить</Link>
           <table className="students-list__table table table-bordered table-responsive">
             <thead>
             <tr>
               <td>№</td>
               <td>ФИО</td>
               <td>Телефон</td>
               <td>Адрес</td>
               <td>Доп. информация</td>
               <td></td>
             </tr>
             </thead>
             <tbody>
              {this.props.students.ids.map((id, i) => <Student studentNumber={i} student={this.props.students.byId[id]} key={i} />)}
             </tbody>
           </table>
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
    students: state.students,
    group: state.account.group_name
});

const mapDispatchToProps = {
    changeTitle,
    fetchStudents
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
