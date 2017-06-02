import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import Content from '../Content';
import DialogContext from '../../components/DialogContext';

class Admin extends Component {
    constructor(props) {
        super(props);

    }

    render() {
       return (
         <div className="app">
           <DialogContext />
           <Header />
           <Content>
             {this.props.children}
           </Content>
         </div>
       )
    }

}
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
