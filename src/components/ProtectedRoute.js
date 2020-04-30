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
import AdPost from './ad/AdPost';
import Account from './account/Account';
import Comment from './comment/Comment';
import Chapter from './ebook/Chapter';


class ProtectedRoute extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <Sidebar />
                    <Header history={this.props.history} />

                    <div className="content-wrapper">

                        <Switch>

                            {/* Ad */}
                            <Route path='/account' exact component={Account} history={this.props.history} />



                            {/* Comment */}
                            <Route path='/comment/post/:id' exact component={Comment} history={this.props.history} />


                            {/* Ad */}
                            {/* <Route path='/ads/edit/:id' component={EbookEdit} history={this.props.history} />
                            <Route path='/ads/detail/:id' component={CategoryEdit} history={this.props.history} /> */}
                            <Route path='/ads' component={AdPost} exact history={this.props.history} />



                            {/* Ebook */}
                            <Route path='/ebook/edit/:id' exact component={EbookEdit} history={this.props.history} />
                            <Route path='/ebook/detail/:id' exact component={CategoryEdit} history={this.props.history} />
                            <Route path='/ebook' exact component={EbookContent} history={this.props.history} />
                            <Route path='/ebook/chapter/:id' exact component={Chapter} history={this.props.history} />



                            {/* Category */}
                            <Route path='/category/edit/:id' exact component={CategoryEdit} history={this.props.history} />
                            <Route path='/category/edit' exact component={CategoryEdit} history={this.props.history} />
                            <Route path='/category' exact component={CategoryList} history={this.props.history} />


                            {/* Post route */}
                            <Route path='/posts/edit/:id' exact component={PostEdit} history={this.props.history} />
                            <Route path='/posts/post' exact component={Post} history={this.props.history} />
                            <Route path='/posts/newslink' exact component={NewsLink} history={this.props.history} />
                            <Route path='/posts/opinion' exact component={OpinionPost} history={this.props.history} />
                            <Route path='/posts/image' exact component={ImagePost} history={this.props.history} />
                            <Route path='/posts/video' exact component={VideoPost} history={this.props.history} />
                            <Route path='/posts/content' exact component={ContentPost} history={this.props.history} />


                            {/* User route */}
                            <Route path='/users/edit/:id' exact component={UserEdit} history={this.props.history} />
                            <Route path='/users/edit' exact component={UserEdit} history={this.props.history} />
                            <Route path='/users' exact component={User} history={this.props.history} />
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