import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, changeTitle } from '../../actions';
import Loader from '../Loader';
import Post from './components/Post'
import { v1 } from 'uuid';

class StartPage extends Component {
    constructor(props) {
        super(props);
        this.isReady = false;
    }

    componentWillMount() {
      this.props.getPosts(4);
    }

    componentDidMount() {
      this.props.changeTitle('Главная');
    }

    render() {
       return !!this.props.posts.ids.length ?  (
         <div className="start-page">
           <h2 className="page__title">Объявления</h2>
           {Object.keys(this.props.posts.byId).map(key => <Post post={this.props.posts.byId[key]} key={v1()} />)}
         </div>
       ) : (<Loader/>)
    }

}
const mapStateToProps = (state) => ({
    posts: state.posts
});

const mapDispatchToProps = {
    getPosts,
    changeTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
