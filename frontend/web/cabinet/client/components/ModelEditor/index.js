/**
 * Created by yazun on 03.12.2016.
 */
const React = require('react');
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { setActiveModel } from '../../actions';
import { MODEL_EDIT, MODEL_CREATE, copy } from '../../helpers';
import FormField from './components/FormField';
import CustomField from './components/CustomField';

/**
 * @class ModelEditor
 * @extends React.Component
 * @member {Object} props
 * @private {Object} _model
 * @private {Number} _mode
 * @private {String} _action
 * @private {Array} _fields
 * @private {String} _actionMethod
 * @private {Function} _submitAction
 */
class ModelEditor extends React.Component {
  /**
   * @constructs ModelEditor
   * @param props
   * @member {Object} props
   */
  constructor(props) {
        super(props);
        this.shouldUpdate = true;
        this._name = this.props.name;
        this._mode = this.props.mode;
        this._action = this.props.action;
        this._actionMethod = this.props.actionMethod;
        this._fields = this.props.fields;
        this._submitCallback = this.props.submitCallback;
        console.log(this._fields);

    }

  /**
   *
   * @param {Event} e Объект события формы
   */
  test_submitForm(e) {
    e && e.preventDefault();

    let result = {};

    let tmpFields = Object.keys(this.props.model.fields).length > 0 ? copy(this.props.model.fields) : copy(this.props.model.names);
    delete tmpFields.meta;

    const inputs = {};
    $(this._form).serializeArray().forEach(input => inputs[input.name] = input.value);

    Object.keys(tmpFields).forEach(key => {
      result[key] = inputs[key];
    });
    result.meta = this.props.model.meta;
    result.meta.forEach(metaField => metaField.m_meta_value = inputs[metaField.m_meta_key]);
    if (this.props.modelId) result[this.props.modelId[0]] = this.props.modelId[1];
    window.console.log('POST DATA: ', result);

    this._submitCallback(result, this.props.afterSubmit);
  }

    submitForm(e) {
      e.preventDefault();
      let model = {};

      let formData = $(this._form).serializeArray();
      console.log(formData);

      formData.forEach(input => model[input.name] = input.value);
      /*formData.filter(field => ~this.props.fields.indexOf(field.name)).forEach(field => model[field.name] = field.value);
      if (this.props.model.fields.meta !== undefined) {
        this.props.model.fields.meta.forEach(metaField => model.meta.push({[metaField.m_meta_key]: metaField.m_meta_value}))
      }*/


      if (this.props.modelId) model[this.props.modelId[0]] = this.props.modelId[1];
      this.props.setActiveModel(Object.assign({}, this.props.model, {
        tmp: this.props.model.fields,
        fields: model,
      }));
      this._submitCallback(model);

    }

    componentWillUnmount() {
      this.props.setActiveModel({
        fields: {}
      })
    }



    render() {
      console.log('FORM RENDER', this.props);
       return (
         <form ref={ref => this._form = ref} className="model-form" action={this._action} method={this._actionMethod} onSubmit={void 0}>
           <div className="fields fields--default">
             {
               this.props.fields.map((field, i) => <FormField field={field} key={v1()} />)
             }
           </div>
           {this.props.canAddMeta ? <CustomField showValues={this.props.mode === 'update'} metaFields={this.props.model.meta} /> : ''}
           <div className="row">
             <button onClick={this.test_submitForm.bind(this)} type="button">{this._mode === MODEL_EDIT ? 'Сохранить' : 'Добавить'}</button>
           </div>
         </form>
       )
    }

}
const mapStateToProps = (state) => ({
  model: state.activeModel
});

export default connect(mapStateToProps, { setActiveModel })(ModelEditor);
