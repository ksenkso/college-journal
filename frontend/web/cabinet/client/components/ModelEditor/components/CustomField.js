/**
 * Created by yazun on 06.01.2017.
 */
//import React, { Component } from 'react';
const React = require('react');
import { connect } from 'react-redux';
import { v1 } from 'uuid';
import { showDialog, hideDialog, setActiveModel } from '../../../actions';
import FormField from './FormField'
/**
 * @class
 * @extends React.Component
 * @classdesc Custom Field Component
 *
 * @member {{showValues: boolean, metaFields: Object[]}} props
 *
 */


class CustomField extends React.Component {

  /**
   * @constructs CustomField
   * @param props
   */
  constructor(props) {
        super(props);

    }

    addField(field, dialogId) {

      /*this.props.setActiveModel({
        fields: Object.assign(
          {},
          this.props.model.fields,
          {
            meta: Array.isArray(this.props.model.fields.meta)
              ? this.props.model.fields.meta.concat({
              m_meta_name: $('#meta_name').val(),
              m_meta_key: `meta_field_${+new Date()}`,
              m_meta_value: ''
            })
              : [{
              m_meta_name: $('#meta_name').val(),
              m_meta_key: `meta_field_${+new Date()}`,
              m_meta_value: ''
            }]
          }),
        names: this.props.model.names
      });*/
      let fields = {};
      let inputs = $('.model-form')
        .serializeArray()
        .filter(input => ~!input.name.indexOf('m_meta_'))
        .forEach(input => fields[input.name] = input.value);

      this.props.setActiveModel({
        fields,
        names: this.props.model.names,
        meta: [...(this.props.model.meta || []), {
          m_meta_name: $('#meta_name').val(),
          m_meta_key: `meta_field_${+new Date()}`,
          m_meta_value: ''
        }]
      });

      this.props.hideDialog(dialogId);

    }

  showFieldDialog() {
    const field = {
      type: 'text',
      name: 'Название поля',
      key: 'meta_name',
      required: true,
      value: ''
    };
    const dialogId = v1();
    let _field = this;
    this.props.showDialog({
        title: '',
        content: (<form action="#">
          <FormField field={field} />
        </form>),
        buttons: [{text: 'Сохранить', handler(){
          _field.addField(field, dialogId);
        }}, {text: 'Отмена', handler(){}}],
        id: dialogId
      });
    }

    formatField(field) {
      return {
        name: field.m_meta_name,
        key: field.m_meta_key,
        value: field.m_meta_value
      };

    }

    render() {
    console.log(this.props.metaFields);
        return (
            <div className="field field--custom">
              <div className="meta-fields">
                {(this.props.metaFields || []).map(field => <FormField field={this.formatField(field)} />)}
              </div>
              <button type="button" onClick={this.showFieldDialog.bind(this)} className="btn btn-primary">Добавить поле</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  model: state.activeModel
});
const mapDispatchToProps = {

  showDialog,
  hideDialog,
  setActiveModel
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomField);
