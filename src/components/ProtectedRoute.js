import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom';

import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './home/Home';
import User from './user/User';
import UserEdit from './user/UserEdit';
import PageNotFound from './home/PageNotFound';
import NewsLink from './post/NewsLink';
import Post from './post/Post';
import OpinionPost from './post/OpinionPost';
import VideoPost from './post/VideoPost';
import ImagePost from './post/ImagePost';
import ContentPost from './post/ContentPost';
import PostEdit from './post/PostEdit';
import CategoryList from './tools/CategoryList';
import CategoryEdit from './tools/CategoryEdit';
import EbookContent from './ebook/EbookContent';
import EbookEdit from './ebook/ContentEdit';


class ProtectedRoute extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <Sidebar />
                    <Header history={this.props.history} />

                    <div className="content-wrapper">

                        <Switch>
                            {/* Ebook */}
                            <Route path='/ebook/edit/:id' component={EbookEdit} history={this.props.history} />
                            <Route path='/ebook/detail/:id' component={CategoryEdit} history={this.props.history} />
                            <Route path='/ebook' component={EbookContent} history={this.props.history} />



                            {/* Category */}
                            <Route path='/category/edit/:id' component={CategoryEdit} history={this.props.history} />
                            <Route path='/category/edit' component={CategoryEdit} history={this.props.history} />
                            <Route path='/category' component={CategoryList} history={this.props.history} />


                            {/* Post route */}
                            <Route path='/posts/edit/:id' component={PostEdit} history={this.props.history} />
                            <Route path='/posts/post' component={Post} history={this.props.history} />
                            <Route path='/posts/newslink' component={NewsLink} history={this.props.history} />
                            <Route path='/posts/opinion' component={OpinionPost} history={this.props.history} />
                            <Route path='/posts/image' component={ImagePost} history={this.props.history} />
                            <Route path='/posts/video' component={VideoPost} history={this.props.history} />
                            <Route path='/posts/content' component={ContentPost} history={this.props.history} />


                            {/* User route */}
                            <Route path='/users/edit/:id' component={UserEdit} history={this.props.history} />
                            <Route path='/users/edit' component={UserEdit} history={this.props.history} />
                            <Route path='/users' component={User} history={this.props.history} />
                            <Route path='/' exact component={Home} history={this.props.history} />
                            <Route path='*' exact component={PageNotFound} history={this.props.history} />
                        </Switch>
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ProtectedRoute