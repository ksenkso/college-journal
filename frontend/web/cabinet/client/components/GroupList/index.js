import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { changeTitle, actionFetchUsers, fetchGroups } from '../../actions';
import Loader from '../Loader';
import Group from './components/Group';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.isReady = false;
    }

    componentWillMount() {
      this.props.fetchGroups();
    }

    componentDidMount() {
      this.props.changeTitle('Список пользователей');
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.groups.ids.length !== 0) this.isReady = true;
    }



    render() {
      console.log(':', this.props.groups);
       return !this.props.ready.groups ? <Loader /> : (
         <div className="groups">
           <table className="group-table">
             <thead>
             <tr>
               <td>Название группы</td>
               <td>Действие</td>
             </tr>
             </thead>
             <tbody>
             {this.props.groups.ids.map(id => <Group group={this.props.groups.byId[id]} />)}
             </tbody>
           </table>
           <Link to='/groups/create'>Добавить группу</Link>
           {this.props.children}
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
    groups: state.groups,
    title: state.title,
    ready: state.ready
});

const mapDispatchToProps = {
  changeTitle, fetchGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
