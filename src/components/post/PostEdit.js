import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Button, Col } from 'react-bootstrap';
import { updateData, getPostDetail } from '../../store/actions/postActions'
import { API_URL } from '../../store/actions/types';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../store/actions/categoryActions';
import { ReactTinyLink } from 'react-tiny-link'
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from '../layout/Loading';
import postValidate from '../validators/postValidate';



window.jQuery = $;
require('bootstrap');

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
            image: '',
            imagePath: null,
            categories: [],
            validation: {},
            isError: false
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            let response = await this.props.getPostDetail(id)
            if (Object.keys(response).length > 0) {
                let { category_id, title, description, newslink, video, type, image } = response
                this.setState({
                    category_id,
                    title,
                    description,
                    newslink,
                    video,
                    type,
                    imagePath: image ? API_URL + image : null,
                    categories: await this.props.getAllCategory()
                })
            }
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    fileUpload = event => {
        let reader = new FileReader()
        let _this = this
        reader.onload = function (r) {
            _this.setState({
                image: r.target.result,
                imagePath: r.target.result,
            });
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    submitHandler = async event => {
        event.preventDefault()
        let validate = postValidate(this.state)
        if (Object.keys(validate).length !== 0) {
            this.setState({ validation: validate, isError: true })
            return false
        }

        this.setState({ isWait: true })
        let { id, type } = this.state
        let url = ""
        if (type === 2) {
            url = '/newslink'
        } else if (type === 3) {
            url = '/opinion'
        } else if (type === 4) {
            url = '/Video'
        } else if (type === 5) {
            url = '/image'
        }

        let { history, updateData } = this.props

        let response = await updateData(this.state, id)
        response && history.push('/posts/list/' + type + url)
        this.setState({ isWait: false })
    }
    render() {
        let { isWait, category_id, title, description, newslink, video, categories, type, isError, validation, imagePath } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card" custom="true">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/posts/post'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <div className="content-post-area">
                                            <Form.Group as={Row}>
                                                <Form.Control
                                                    type='text'
                                                    name='title'
                                                    placeholder='Post Heading'
                                                    value={title}
                                                    onChange={this.changeHandler}
                                                    className={isError && validation.title && 'is-invalid'}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Row}>
                                                <ReactSummernote
                                                    value={description}
                                                    className='w-100 border-0'
                                                    options={{
                                                        lang: 'ru-RU',
                                                        height: 300,
                                                        dialogsInBody: true,
                                                        toolbar: [
                                                            ['font', ['bold', 'italic', 'underline', 'clear']],
                                                        ],
                                                    }}
                                                    onChange={(description) => this.setState({ description })}
                                                />
                                            </Form.Group>
                                            {type === 2 &&
                                                <Form.Group as={Row}>
                                                    <Form.Label> News Link </Form.Label>
                                                    <Col className='border-radius-20'>
                                                        <Form.Control
                                                            type='text'
                                                            name='newslink'
                                                            value={newslink}
                                                            onChange={this.changeHandler}
                                                            className={isError && validation.newslink && 'is-invalid'}
                                                        />
                                                        {isError && validation.newslink && <div className="invalid-feedback">{validation.newslink}</div>}
                                                    </Col>
                                                </Form.Group>}

                                            {type === 4 &&
                                                <Form.Group as={Row}>
                                                    <Form.Label> Video Link </Form.Label>
                                                    <Col className='border-radius-20'>
                                                        <Form.Control
                                                            type='text'
                                                            name='video'
                                                            value={video}
                                                            onChange={this.changeHandler}
                                                            className={isError && validation.video && 'is-invalid'}
                                                        />
                                                        {isError && validation.video && <div className="invalid-feedback">{validation.video}</div>}
                                                    </Col>
                                                </Form.Group>}

                                            {newslink && newslink.length > 20 &&
                                                <Form.Group as={Row}>
                                                    <ReactTinyLink
                                                        cardSize="small"
                                                        showGraphic={true}
                                                        maxLine={2}
                                                        minLine={1}
                                                        url={newslink}
                                                        width='100%'
                                                    />
                                                </Form.Group>}

                                            {video && video.length > 20 &&
                                                <Form.Group as={Row}>
                                                    <ReactTinyLink
                                                        cardSize="small"
                                                        showGraphic={true}
                                                        maxLine={2}
                                                        minLine={1}
                                                        url={video}
                                                        width='100%'
                                                    />
                                                </Form.Group>}

                                            <Form.Group as={Row}>
                                                <Form.Label > Category </Form.Label>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        name='category_id'
                                                        custom="true"
                                                        value={category_id}
                                                        onChange={this.changeHandler}
                                                        className={isError && validation.category_id && 'is-invalid'}
                                                    >
                                                        <option value=''>Select Category</option>
                                                        {categories.length > 0 && categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                                    </Form.Control>
                                                    {isError && validation.category_id && <div className="invalid-feedback">{validation.category_id}</div>}
                                                </Col>
                                            </Form.Group>

                                            {type === 5 &&
                                                <Form.Group>
                                                    {/* <Form.File id="exampleFormControlFile1" label="Example file input" /> */}
                                                    <Form.File
                                                        id="custom-file profile-photo-upload"
                                                        onChange={this.fileUpload}
                                                        className={(isError && validation.image ? 'is-invalid choose-image-input-field' : 'choose-image-input-field') || 'choose-image-input-field'}
                                                    />
                                                    {isError && validation.image && <div className="invalid-feedback">{validation.image}</div>}
                                                </Form.Group>}
                                            <Form.Group>
                                                {imagePath && <img src={imagePath} alt='UploadImage' width='100' />}
                                            </Form.Group>

                                            <Form.Group as={Row} className='px-2'>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className='btn-primary border-none'
                                                    disabled={isWait}
                                                    block
                                                >{isWait ? <Loading /> : 'Post'}</Button>
                                            </Form.Group>
                                        </div>
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
export default connect(mapStateToProps, { updateData, getPostDetail, getAllCategory })(PostEdit)