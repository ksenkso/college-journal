/**
 * Created by yazun on 05.12.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModelEditor from '../ModelEditor'
/**
 * @class ModelEditorFactory
 *
 * @property {@public Object} model
 * @property {@public Object} required
 * @property {@public Object} names
 * @property {@public Object} rules
 * @property {@public String} modelName
 */
class ModelEditorFactory extends Component {
    constructor(props) {
        super(props);
        const { modelName, required, names, rules, types } = this.props;
        this._model = { modelName, required, names, rules, types }
    }

    serializeList(models, key, value) {
      return models.map(model => ({key, value: model[value]}));
    }

  /**
   *
   * @return {Array}
   */
    processModel() {
      const { required, rules, types} = this._model;
      const names = this.props.model.names || {};
      return Object.keys(names).map(key => {
        let fieldObject = {
          key,
          value: (this.props.model.fields && this.props.model.fields[key]) ? this.props.model.fields[key] : '',
          name: names[key],
          required: required[key] || false,
          rules: rules[key] || {},
          type: types[key] ? types[key][0] : 'customField'
        };
        if (types[key] && types[key][0] === 'select') {
          // types[key][1] contains the property name which stores an array of options for Select component
          fieldObject.value = types[key][1];
        }
        return fieldObject;
      });
    }

    render() {
       return (
         <ModelEditor
          modelId={this.props.modelId}
          fields={this.processModel()}
          name={this._model.modelName}
          mode={this.props.mode}
          action={this.props.action}
          canAddMeta={this.props.canAddMeta}
          meta={this.props.model.fields.meta}
          actionMethod={this.props.actionMethod}
          submitCallback={this.props.submitCallback}
          afterSubmit={this.props.afterSubmit}
         />
       )
    }

}
const mapStateToProps = (state) => ({
  model: state.activeModel
});

export default connect(mapStateToProps)(ModelEditorFactory);
