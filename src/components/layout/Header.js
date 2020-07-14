import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            user: props.auth.user
        }
    }
    render() {
        let { user } = this.state
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
                            <a onClick={() => this.props.logout(this.props.history)} className="nav-link" data-toggle="dropdown" href="#Blank">
                                Logout <i className="fa fa-lock"></i>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#Blank">
                                {user.name} <i className="far fa-user-circle"></i>
                                <span className="badge badge-warning navbar-badge"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <div className="dropdown-divider"></div>
                                <a href="#blank" className="dropdown-item">
                                    <i className="fas fa-sign-out mr-2"></i> Logout
          </a>
                                <div className="dropdown-divider"></div>
                                <a href="#Blank" className="dropdown-item">
                                    <i className="fas fa-file mr-2"></i> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
                                </a>
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