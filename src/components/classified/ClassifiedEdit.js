import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Button, Col } from 'react-bootstrap';
import { updateData, getClassifiedDetail } from '../../store/actions/classifiedActions'
import { API_URL } from '../../store/actions/types';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../store/actions/categoryActions';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import labelImg from '../assets/images/image-upload.png'
import Loading from '../layout/Loading';
import classifiedValidate from '../validators/classifiedValidate';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';


window.jQuery = $;
require('bootstrap');

class ClassifiedEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id || null,
            page_id: 0,
            type: 1,
            title: '',
            description: '',
            contact: '',
            email: '',
            price: '',
            city_id: '',
            currency: '',
            address: '',
            imagePath: null,
            image: null,
            isWait: false,
            isError: false,
            validation: {},
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            let response = await this.props.getClassifiedDetail(id)
            if (Object.keys(response).length !== 0) {
                let { page_id, type, title, description, contact, email, price, city_id, currency, address, image } = response
                this.setState({
                    page_id,
                    type,
                    title,
                    description,
                    contact,
                    email,
                    price,
                    city_id,
                    currency,
                    address,
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
        let validate = classifiedValidate(this.state)
        if (Object.keys(validate).length !== 0) {
            this.setState({
                validation: validate,
                isError: true
            })
            return false
        }

        this.setState({ isWait: true })
        let { id } = this.state
        let { history, updateData } = this.props

        let response = await updateData(this.state, id)
        response && history.push('/classified/list')
        this.setState({ isWait: false })
    }
    render() {
        let { type, title, description, contact, email, price, currency, isError, validation, imagePath, isWait } = this.state
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
                                            <Form.Group>
                                                <Form.Control
                                                    as='select'
                                                    name='type'
                                                    custom
                                                    value={type}
                                                    onChange={this.changeHandler}
                                                    className={isError && validation.type && 'is-invalid'}
                                                >
                                                    <option value=''>Select Category</option>
                                                    <option value='1'>Product Sale</option>
                                                    <option value='2'>House Rent</option>
                                                    <option value='3'>Others</option>
                                                </Form.Control>
                                                {isError && validation.type && <div className="invalid-feedback">{validation.type}</div>}
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type='text'
                                                    name='title'
                                                    placeholder='Write A Title For Your Classified'
                                                    value={title}
                                                    onChange={this.changeHandler}
                                                    className={(isError && validation.title) ? 'is-invalid border-bottom' : 'border-bottom'}
                                                />
                                                {isError && validation.category_id && <div className="invalid-feedback">{validation.category_id}</div>}
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Control
                                                    id='thumbnail-image'
                                                    type='file'
                                                    name='thumbnail'
                                                    onChange={this.fileUpload}
                                                    className={isError && validation.image ? 'is-invalid d-none' : 'd-none'}
                                                />
                                                <Form.Label htmlFor='thumbnail-image' className='text-center w-100 m-0'>
                                                    {imagePath && <img src={imagePath || labelImg} alt='imgUpload' className='m-auto' height='70' />} <br />
                                        Upload Thumbnail Photo (Maximum file size: 1MB)
                                    </Form.Label>
                                                {isError && validation.image && <div className="invalid-feedback">{validation.image}</div>}
                                            </Form.Group>


                                            <Row>
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        type='number'
                                                        name='contact'
                                                        placeholder='Contact No'
                                                        value={contact}
                                                        onChange={this.changeHandler}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        type='email'
                                                        name='email'
                                                        placeholder='Email Address'
                                                        value={email}
                                                        onChange={this.changeHandler}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        as='select'
                                                        name='currency'
                                                        custom
                                                        value={currency}
                                                        onChange={this.changeHandler}
                                                    >
                                                        <option value=''>Choose Your Currency</option>
                                                        <option value='1'>BDT</option>
                                                        <option value='2'>USD</option>
                                                        <option value='3'>ERO</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        type='number'
                                                        name='price'
                                                        placeholder='Product Price'
                                                        value={price}
                                                        onChange={this.changeHandler}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Form.Group className='mb-0'>
                                                <ReactSummernote
                                                    value={description}
                                                    className='w-100'
                                                    options={{
                                                        lang: 'ru-RU',
                                                        height: 120,
                                                        dialogsInBody: true,
                                                        toolbar: [
                                                            ['style', ['style']],
                                                            ['font', ['bold', 'underline', 'clear']],
                                                            ['para', ['ul', 'ol', 'paragraph']],
                                                            ['insert', ['link']],
                                                        ],
                                                    }}
                                                    onChange={(description) => this.setState({ description })}
                                                />
                                            </Form.Group>



                                            <Form.Group as={Row} className='px-2 float-right'>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className='btn-primary border-none border-radius-0 mt-3'
                                                    disabled={isWait}
                                                >{isWait ? <Loading /> : 'SUBMIT'}</Button>
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
export default connect(mapStateToProps, { updateData, getClassifiedDetail, getAllCategory })(ClassifiedEdit)