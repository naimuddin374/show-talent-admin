import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/actions/authActions'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import logo from '../assets/images/logo.png';
import logo from '../assets/images/logo-black.svg';
import './Style.css';

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        isAdmin: 1,
        isWait: false
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = async event => {
        event.preventDefault()
        this.setState({
            isWait: true
        })
        let { email, password } = this.state
        let { login, history } = this.props

        let response = await login({ email, password })
        response && history.push('/')
        this.setState({
            isWait: false
        })
    }
    render() {
        let { email, password, isWait } = this.state
        let isDone = email && password && !isWait
        return (
            <React.Fragment>
                <div className="container-fluid bg-dark vh-100 overflow-hidden p-0">
                    <div className="left-card-section">
                        <div className="left-logo">
                            <img className="align-content" src={logo} alt="MainLogo" />
                        </div>
                        <div className="company-information">
                            <h3>WE USE THE POWER OF DESIGN AND TECHNOLOGY TO CREATE TRANSFORMATIONAL CHANGE.</h3>
                            <p>Empower your digital transformation with a partner who works closely with you and your team to understand your business challenges and creates unprecedented mobile-first and innovative digital experiences to help solve them.</p>
                        </div>
                    </div>
                    <div className="right-card-section">
                        {/* <h2>Beatnik Login</h2> */}
                        <div className="login-form-area">
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group>
                                    <Form.Label>Email<span>*</span></Form.Label>
                                    <Form.Control
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        name="email"
                                        defaultValue={email}
                                        onChange={this.changeHandler}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password<span>*</span></Form.Label>
                                    <Form.Control
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        name="password"
                                        defaultValue={password}
                                        onChange={this.changeHandler}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="sign-in-btn" disabled={!isDone} block>{isWait ? `Please Wait...` : 'Sign In'}</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default connect(null, { login })(Login)