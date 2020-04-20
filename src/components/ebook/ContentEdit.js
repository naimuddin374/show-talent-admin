import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { updateData } from '../../store/actions/ebookActions'
import { API_URL } from '../../store/actions/types';
import Axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

class EbookEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.id || null,
            category_id: '',
            title: '',
            language: '',
            publication_date: null,
            ebook_summery: '',
            author_summery: '',
            preface: '',
            price: '',
            status: '',
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
            Axios.get(`${API_URL}api/ebook/${id}`)
                .then(res => {
                    if (res.data.length !== 0) {
                        let { category_id, title, language, publication_date, ebook_summery, author_summery, preface, price, status } = res.data[0]
                        this.setState({ category_id, title, language, publication_date, ebook_summery, author_summery, preface, price, status })
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
        let { id } = this.state
        let isWait = await this.props.updateData(this.state, id)
        this.setState({ isWait })

        if (isWait) {
            setTimeout(() => {
                this.props.history.push('/ebook')
            }, 1000)
        }
    }
    render() {
        let { isWait, category_id, title, language, ebook_summery, price, status, preface, categories } = this.state
        let isDone = category_id && title && language && ebook_summery && price && status !== ''
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/ebook'><i className="fa fa-eye"></i></Link>
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
                                            <Form.Label>Language<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Language"
                                                name="language"
                                                defaultValue={language}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Price"
                                                name="price"
                                                defaultValue={price}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Summery</Form.Label>
                                            <ReactSummernote
                                                value={ebook_summery}
                                                options={{
                                                    lang: 'ru-RU',
                                                    height: 80,
                                                    dialogsInBody: true,
                                                    toolbar: [
                                                        ['style', ['style']],
                                                        ['font', ['bold', 'underline', 'clear']],
                                                        ['fontname', ['fontname']],
                                                        ['para', ['ul', 'ol', 'paragraph']],
                                                        ['table', ['table']],
                                                        ['insert', ['link']],
                                                        // ['insert', ['link', 'picture', 'video']],
                                                        ['view', ['fullscreen', 'codeview']]
                                                    ]
                                                }}
                                                onChange={(ebook_summery) => this.setState({ ebook_summery })}
                                            // onEnter={this.submitHandler}
                                            // onImageUpload={this.imageUpload}
                                            />
                                        </Form.Group>


                                        <Form.Group>
                                            <Form.Label>Preface</Form.Label>
                                            <ReactSummernote
                                                value={preface}
                                                options={{
                                                    lang: 'ru-RU',
                                                    height: 80,
                                                    dialogsInBody: true,
                                                    toolbar: [
                                                        ['style', ['style']],
                                                        ['font', ['bold', 'underline', 'clear']],
                                                        ['fontname', ['fontname']],
                                                        ['para', ['ul', 'ol', 'paragraph']],
                                                        ['table', ['table']],
                                                        ['insert', ['link']],
                                                        ['view', ['fullscreen', 'codeview']]
                                                    ]
                                                }}
                                                onChange={(preface) => this.setState({ preface })}
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
export default connect(mapStateToProps, { updateData })(EbookEdit)