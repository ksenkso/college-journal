import React, { Component } from 'react';
import Loader from '../Loader';
import FormField from './components/FormField';
import { v1 } from 'uuid';

class SubmodelEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return this.isReady() ? (
         <div className="submodel-editor">
           <h3 className="submodel__name">{this.props.modelName}</h3>
           {
             this.props.fields.map((field, i) => <FormField field={field} key={v1()} />)
           }
         </div>
       ) : <Loader />
    }

}

export default SubmodelEditor;
