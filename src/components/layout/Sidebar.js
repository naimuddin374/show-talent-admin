import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userImg from '../assets/images/user2-160x160.jpg'



class Sidebar extends Component {
    render() {
        return (
            <Fragment>
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={userImg} className="img-circle elevation-2" alt="UserImage" />
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
                                        <p>Post <i className="right fas fa-angle-left"></i></p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        {/* <li className="nav-item">
                                            <Link to="/posts/list/post" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Post</p>
                                            </Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link to="/posts/list/2" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of News link</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/list/3" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Opinion</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/list/4" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Video</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/posts/list/5" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Image</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>


                                {/* Ebook */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p> Ebook <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/ebook" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of Ebook</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                {/* Ad */}
                                <li className="nav-item has-treeview">
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
                                </li>


                                {/* Account */}
                                <li className="nav-item has-treeview">
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
                                </li>


                                {/* User */}
                                <li className="nav-item has-treeview">
                                    <a href="#blank" className="nav-link">
                                        <i className="nav-icon fas fa-users"></i>
                                        <p> User <i className="right fas fa-angle-left"></i> </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/users" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>List of User</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/users/add" className="nav-link">
                                                <i className="far fa-circle nav-icon"></i>
                                                <p>Add New User</p>
                                            </Link>
                                        </li>
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
export default connect(mapStateToProps)(Sidebar)