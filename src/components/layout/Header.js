import React, { Component, Fragment } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { API_URL } from '../../store/actions/types';
import { Link } from 'react-router-dom';
import ChangePassword from '../profile/ChangePassword';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            user: props.auth.user
        }
    }
    render() {
        let { user, isOpen } = this.state
        return (
            <Fragment>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="#Blank"><i className="fas fa-bars"></i></a>
                        </li>
                    </ul>


                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#Blank">
                                <i className="far fa-user-circle"></i>
                                <span className="badge badge-warning navbar-badge"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <div className="dropdown-divider"></div> -->
          <a href="#blank" className="dropdown-item">
                                    <i className="fas fa-sign-out mr-2"></i> Logout
          </a>
                                <a href="#Blank" className="dropdown-item">
                                    <i className="fas fa-users mr-2"></i> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#Blank" className="dropdown-item">
                                    <i className="fas fa-file mr-2"></i> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#Blank" className="dropdown-item dropdown-footer">See All Notifications</a> -->
        </div>
                        </li>
                    </ul>
                </nav>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { logout })(Header)