import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { updateData } from '../../store/actions/postActions'
import { API_URL } from '../../store/actions/types';
import Axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class PostEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.id || null,
            category_id: '',
            title: '',
            description: '',
            newslink: '',
            video: '',
            type: '',
            status: '',
            image: '',
            categories: []
        }
    }
    componentDidMount() {
        let { id } = this.state
        Axios.get(`${API_URL}api/category`)
            .then(res => {
                this.setState({ categories: res.data })
            })

        if (id) {
            Axios.get(`${API_URL}api/post/${id}`)
                .then(res => {
                    if (Object.keys(res.data).length !== 0) {
                        let { category_id, title, description, newslink, video, status, type, image } = res.data[0]
                        this.setState({ category_id, title, description, newslink, video, status, type, image })
                    }
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
        let { id, type } = this.state
        let isWait = await this.props.updateData(this.state, id)
        this.setState({ isWait })

        if (isWait) {
            setTimeout(() => {
                let url = "post"
                if (type === 2) {
                    url = 'newslink'
                } else if (type === 3) {
                    url = 'opinion'
                } else if (type === 4) {
                    url = 'Video'
                } else if (type === 5) {
                    url = 'image'
                } else if (type === 6) {
                    url = 'content'
                }
                this.props.history.push('/posts/' + url)
            }, 1000)
        }
    }
    render() {
        let { isWait, category_id, title, description, newslink, video, categories, status, type, image } = this.state
        let isDone = category_id && type !== '' && status !== ''
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/posts/post'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Category<span>*</span></Form.Label>
                                            <Form.Control
                                                as="select"
                                                className="form-control"
                                                name="category_id"
                                                value={category_id}
                                                onChange={this.changeHandler}
                                            >
                                                <option value="">Select One</option>
                                                {categories.length > 0 && categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                            </Form.Control>
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
                                                <option value="1">Post</option>
                                                <option value="2">News Link</option>
                                                <option value="3">Opinion</option>
                                                <option value="4">Video</option>
                                                <option value="5">Image</option>
                                                <option value="6">Content</option>
                                                <option value="7">Others</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Title<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Title"
                                                name="title"
                                                defaultValue={title}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                className="form-control"
                                                placeholder="Enter Description"
                                                name="description"
                                                value={description}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>News Link</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter News Link"
                                                name="newslink"
                                                defaultValue={newslink}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Video Link</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Video"
                                                name="video"
                                                defaultValue={video}
                                                onChange={this.changeHandler}
                                            />
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
                                        <Form.Group>
                                            <Form.Label>{image && <img src={API_URL + image} height="200" />}</Form.Label>


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
export default connect(mapStateToProps, { updateData })(PostEdit)