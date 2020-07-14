import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData, getUserDetail } from '../../store/actions/userActions'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.id || null,
            full_name: '',
            name: '',
            contact: '',
            email: '',
            status: 0,
            type: 1,
            password: '',
            confirmPassword: '',
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            let response = await this.props.getUserDetail(id)
            let { contact, email, full_name, name, status, type } = response
            this.setState({ contact, email, full_name, name, status, type })
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = async event => {
        event.preventDefault()
        this.setState({ isWait: true })
        let { id } = this.state

        let { storeData, updateData, history } = this.props

        let response = id ? await updateData(this.state, id) : await storeData(this.state)
        if (response) history.push('/user/list')
        this.setState({ isWait: false })
    }
    render() {
        let { isWait, id, contact, email, full_name, name, status, type, password, confirmPassword } = this.state
        let isDone = !isWait && full_name && name && contact && email && type !== '' && status !== ''
        if (!id) {
            if (!password || (password !== confirmPassword)) {
                isDone = false
            }
        }
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/user/list'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Full Name<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Write Full Name"
                                                name="full_name"
                                                value={full_name}
                                                onChange={this.changeHandler}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Display Name<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Write Display Name"
                                                name="name"
                                                value={name}
                                                onChange={this.changeHandler}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Contact Number<span>*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                className="form-control"
                                                placeholder="Write Contact Number"
                                                name="contact"
                                                value={contact}
                                                onChange={this.changeHandler}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email<span>*</span></Form.Label>
                                            <Form.Control
                                                type="email"
                                                className="form-control"
                                                placeholder="Write Email"
                                                name="email"
                                                autoComplete="off"
                                                value={email}
                                                onChange={this.changeHandler}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password{!id && <span>*</span>}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                placeholder="Write Password"
                                                name="password"
                                                autoComplete="off"
                                                value={password}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Confirm Password{!id && <span>*</span>}</Form.Label>
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                placeholder="Write Password"
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Type<span>*</span></Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-control"
                                                name="type"
                                                value={type}
                                                onChange={this.changeHandler}
                                            >
                                                <option value="">Select One</option>
                                                <option value="1">User</option>
                                                <option value="2">Moderator</option>
                                                <option value="3">Admin</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Status<span>*</span></Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-control"
                                                name="status"
                                                value={status}
                                                onChange={this.changeHandler}
                                            >
                                                <option value="">Select One</option>
                                                <option value="0">Pending</option>
                                                <option value="1">Active</option>
                                                <option value="2">Blocked</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" block variant="dark" disabled={!isDone}>{isWait ? `Please Wait...` : `Submit`}</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps, { updateData, storeData, getUserDetail })(UserEdit)