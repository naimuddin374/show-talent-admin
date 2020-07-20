import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userImg from '../assets/images/logo.png'
import { getPendingCount } from '../../store/actions/commonActions'


class Sidebar extends Component {
    state = {
        post: [],
        postComment: 0,
        ebook: 0,
        ebookComment: 0,
        chapter: 0,
        classified: 0,
        user: 0,
        page: 0,
    }
    async componentDidMount() {
        let response = await this.props.getPendingCount()
        if (response) {
            let { post, postComment, ebook, ebookComment, chapter, classified, user, page } = response
            this.setState({
                post, postComment, ebook, ebookComment, chapter, classified, user, page
            })
        }
    }
    render() {
        let { post, postComment, ebook, classified, user, page } = this.state
        let totalPost = post.length + postComment

        let postNews = post.filter(item => Number(item.type) === 2).length
        let postOpinion = post.filter(item => Number(item.type) === 3).length || 0
        let postVideo = post.filter(item => Number(item.type) === 4).length
        let postImg = post.filter(item => Number(item.type) === 5).length

        // ebook += ebookComment + chapter
        return (
            <Fragment>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <Link to='/'> <img src={userImg} className="img-circle elevation-2" alt="UserImage" /></Link>
                            </div>
                            <div className="info">
                                <a href="#blank" className="d-block"></a>
                            </div>
                        </div>


                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                                {/* Post */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>Post {totalPost > 0 && `(${totalPost})`} <i className="right fas fa-angle-left"></i></p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/posts/list/2/newslink" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of News link {postNews > 0 && `(${postNews})`}</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/list/3/opinion" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Opinion {postOpinion > 0 && `(${postOpinion})`}</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/list/4/video" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Video {postVideo > 0 && `(${postVideo})`}</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/list/5/image" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Image {postImg > 0 && `(${postImg})`}</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/editor/list" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Editor</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>


                                {/* Classified */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p> Classified {classified > 0 && `(${classified})`} <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/classified/list" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Classified</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>



                                {/* Ebook */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p> Ebook {ebook > 0 && `(${ebook})`} <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/ebook/list" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Ebook</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* Ad */}
                                {/* <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p> Ad <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/ads" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Ad</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li> */}


                                {/* Account */}
                                {/* <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p> Account <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/account" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Account Statement</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li> */}


                                {/* User */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-users"></i>
                                        <p> User {user > 0 && `(${user})`} <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/user/list" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>User & Moderator</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/users/create" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Add New User</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* Page */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-users"></i>
                                        <p> Page {page > 0 && `(${page})`} <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/page/list" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Page</p>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link to="/Page/create" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Add New Page</p>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </li>


                                {/* Tools */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-users"></i>
                                        <p> Tools <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/category" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Category</p>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>


                            </ul>
                        </nav>
                    </div>
                </aside>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { getPendingCount })(Sidebar)