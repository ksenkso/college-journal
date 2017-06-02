/**
 * Created by yazun on 11.12.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSpecs, createGroup, setActiveModel, changeTitle } from '../../actions'
import ModelEditorFactory from '../ModelEditorFactory';
import Loader from '../Loader';

class GroupCreate extends Component {
  constructor(props) {
    super(props);
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

  componentWillMount() {
    this.props.fetchSpecs()
  }

  componentDidUpdate() {
    this.props.setActiveModel({specs: Object.keys(this.props.specs.byId).map(key => ({value: key, name: this.props.specs.byId[key].name})), fields: []})
    this.props.changeTitle('Создать группу');
  }

  render() {
    return !this.props.specs.ids.length ? <Loader /> : (
      <ModelEditorFactory
        modelName="Группа"
        names={this._names}
        rules={{}}
        required={this._required}
        types={this._types}
        submitCallback={this.props.createGroup}
      />
    )
  }

}

const mapStateToProps = (state) => ({
  currentStudent: state.currentStudent,
  specs: state.specs
});

export default connect(mapStateToProps, { fetchSpecs, createGroup, setActiveModel, changeTitle })(GroupCreate);
