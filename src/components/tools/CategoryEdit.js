import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData, getCategoryDetail } from '../../store/actions/categoryActions'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.id || null,
            name: '',
            status: 1
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            this.setState({
                ...await this.props.getCategoryDetail(id)
            })
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
        let response = id ? await this.props.updateData(this.state, id) : await this.props.storeData(this.state)
        response && this.props.history.push('/category')
        this.setState({ isWait: false })
    }
    render() {
        let { name, isWait } = this.state
        let isDone = name
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/category'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Name<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                name="name"
                                                defaultValue={name}
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
const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps, { updateData, storeData, getCategoryDetail })(CategoryEdit)