/**
 * Created by yazun on 23.12.2016.
 */
import React, { Component } from 'react';
import { formatDate } from '../../../helpers';
class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
         <div className="post">
           <div className="post__header">
             <div className="post__title">{this.props.post.title}</div>
             <div className="post__date">{formatDate(new Date(this.props.post.updated_at), 'dd.mm.yy')}</div>
           </div>
           <div className="post__content">
             {this.props.post.text}
           </div>
           <div className="post__footer">
             {`${this.props.post.first_name} ${this.props.post.last_name}`}
           </div>
         </div>
       )
    }

}

export default Post;
