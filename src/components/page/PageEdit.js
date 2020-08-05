import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData, getPageDetail } from '../../store/actions/pageActions'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../store/actions/categoryActions';


class PageEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.id || null,
            name: '',
            contact: '',
            email: '',
            bio: '',
            category_id: 0,
            categories: []
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            let response = await this.props.getPageDetail(id)
            let { contact, email, name, category_id, bio } = response
            this.setState({ contact, email, name, category_id, bio, categories: await this.props.getAllCategory() })
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
        if (response) history.push('/page/list')
        this.setState({ isWait: false })
    }
    render() {
        let { isWait, contact, email, name, category_id, categories, bio } = this.state
        let isDone = !isWait && name && contact && email
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/page/list'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Select Category<span>*</span></Form.Label>
                                            <Form.Control
                                                as='select'
                                                className="form-control"
                                                name="category_id"
                                                value={category_id}
                                                onChange={this.changeHandler}
                                                required
                                            >
                                                <option value=''>Select One</option>
                                                {categories.length > 0 && categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Name<span>*</span></Form.Label>
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
                                            <Form.Label>Bio</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                className="form-control"
                                                placeholder="Write Bio"
                                                name="bio"
                                                value={bio}
                                                onChange={this.changeHandler}
                                            />
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
export default connect(null, { updateData, storeData, getPageDetail, getAllCategory })(PageEdit)