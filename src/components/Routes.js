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
import Post from './post/Post';
import PostEdit from './post/PostEdit';
import CategoryList from './tools/CategoryList';
import CategoryEdit from './tools/CategoryEdit';
import EbookContent from './ebook/EbookContent';
import AdPost from './ad/AdPost';
import Account from './account/Account';
import Comment from './comment/Comment';
import EbookDetail from './ebook/EbookDetail';
import Classified from './classified/Classified';
import ClassifiedEdit from './classified/ClassifiedEdit';



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
                            {/* <Route path='/ebook/edit/:id' exact component={EbookEdit} history={this.props.history} /> */}
                            {/* <Route path='/ebook/detail/:id' exact component={CategoryEdit} history={this.props.history} /> */}
                            <Route path='/ebook' exact component={EbookContent} history={this.props.history} />
                            <Route path='/ebook/detail/:dataId' exact component={EbookDetail} history={this.props.history} />



                            {/* Category */}
                            <Route path='/category/edit/:id' exact component={CategoryEdit} history={this.props.history} />
                            <Route path='/category/edit' exact component={CategoryEdit} history={this.props.history} />
                            <Route path='/category' exact component={CategoryList} history={this.props.history} />


                            {/* Post route */}
                            <Route path='/posts/edit/:id/:title' exact component={PostEdit} history={this.props.history} />
                            <Route path='/posts/list/:type/:title' exact component={Post} history={this.props.history} />

                            {/* Classified route */}
                            <Route path='/classified/edit/:id/:title' exact component={ClassifiedEdit} history={this.props.history} />
                            <Route path='/classified/list' exact component={Classified} history={this.props.history} />


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