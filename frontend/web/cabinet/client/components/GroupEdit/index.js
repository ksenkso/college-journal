/**
 * Created by yazun on 26.12.2016.
 */
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchSpecs, fetchGroups, updateGroup, setActiveModel, changeTitle } from '../../actions'
import ModelEditorFactory from '../ModelEditorFactory';
import Loader from '../Loader';
import { MODEL_EDIT } from '../../helpers';

class GroupEdit extends Component {
  constructor(props) {
    super(props);
    this.isReady = false;
    this._types = {
      name: ['text'],
      abbreviation: ['text'],
      year: ['text'],
      spec_id: ['select', 'specs']
    };
    this._required = {
      name: true,
      abbreviation: true,
      year: true,
      spec_id: true
    };
    this._names = {
      name: 'Название',
      abbreviation: 'Аббревиатура',
      year: 'Год поступления',
      spec_id: 'Специальность'
    };
  }

  checkReady() {
    if (this.props.ready.specs && this.props.ready.groups && !this.isReady) {
      this.props.setActiveModel({
        specs: Object.keys(this.props.specs.byId).map(key => ({value: key, name: this.props.specs.byId[key].name})),
        fields: this.props.groups.byId[+this.props.params.groupId]
      });
      this.isReady = true;
    }
  }

  goToList() {
    hashHistory.push('/groups');
  }

  componentWillMount() {
    this.props.fetchGroups();
    this.props.fetchSpecs();
  }

  componentDidUpdate() {
    this.checkReady();
    this.isReady && this.props.changeTitle(`Редактирование группы: ${this.props.groups.byId[+this.props.params.groupId].name}`);
  }

  render() {
    return !this.isReady ? <Loader /> : (
      <ModelEditorFactory
        modelId={['group_id', +this.props.params.groupId]}
        modelName="Группа"
        names={this._names}
        rules={{}}
        required={this._required}
        types={this._types}
        submitCallback={this.props.updateGroup}
        afterSubmit={this.goToList.bind(this)}
        mode={MODEL_EDIT}
      />
    )
  }

}

const mapStateToProps = (state) => ({
  specs: state.specs,
  activeModel: state.activeModel,
  ready: state.ready,
  groups: state.groups
});

export default connect(mapStateToProps, { fetchSpecs, updateGroup, setActiveModel, changeTitle, fetchGroups })(GroupEdit);
