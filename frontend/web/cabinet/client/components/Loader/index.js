import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
         <div className="loader">Loading...</div>
       )
    }

}
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
