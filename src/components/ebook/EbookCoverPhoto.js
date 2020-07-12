import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { getBookDetail, updateCoverPhoto } from '../../store/actions/ebookActions'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import ebookCoverPhotoValidate from '../validators/ebookCoverPhotoValidate';
import labelImg from '../assets/images/image-upload.png'
import { API_URL } from '../../store/actions/types';


class EbookCoverPhoto extends Component {
    state = {
        isError: false,
        isWait: false,
        dataId: this.props.match.params.dataId,
        front_image: '',
        frontImagePath: '',
        back_image: '',
        backImagePath: '',
        validation: {},
        name: '',
        isUpdate: false
    }
    async componentDidMount() {
        let { dataId } = this.state
        let response = await this.props.getBookDetail(dataId)
        if (Object.keys(response).length !== 0) {
            let { name, front_image, back_image } = response
            this.setState({
                name,
                frontImagePath: front_image ? API_URL + front_image : '',
                backImagePath: back_image ? API_URL + back_image : '',
                isUpdate: Object.keys(response.chapter).length !== 0
            })
        }
    }
    fileUpload = event => {
        let reader = new FileReader()
        let _this = this
        reader.onload = function (r) {
            _this.setState({
                front_image: r.target.result,
                frontImagePath: r.target.result,
            });
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    backImgFileUpload = event => {
        let reader = new FileReader()
        let _this = this
        reader.onload = function (r) {
            _this.setState({
                back_image: r.target.result,
                backImagePath: r.target.result,
            });
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    submitHandler = async event => {
        event.preventDefault()
        let { updateCoverPhoto, history } = this.props
        let { dataId, front_image, back_image } = this.state
        if (!front_image && !back_image) history.push(`/ebook/list`)

        this.setState({ isWait: true, isError: false })
        let response = await updateCoverPhoto({ front_image, back_image }, dataId);
        if (response) history.push(`/ebook/list`)
        this.setState({ isWait: false })
    }
    render() {
        let { isWait, frontImagePath, backImagePath, isError, validation } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <h3 className='float-left'>Edit Ebook Cover Photo</h3>
                                    <Link className="btn btn-dark btn-sm float-right" to='/ebook'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id='thumbnail-image'
                                                    type='file'
                                                    name='thumbnail'
                                                    onChange={this.fileUpload}
                                                    className={isError && validation.front_image ? 'is-invalid d-none' : 'd-none'}
                                                />
                                                <Form.Label htmlFor='thumbnail-image' className='text-center w-100 m-0'>
                                                    <img src={frontImagePath || labelImg} alt='imgUpload' className='m-auto' height='70' /> <br />
                                        Front Side Photo Upload (Max file size: 1MB)
                                    </Form.Label>
                                                {isError && validation.front_image && <div className="invalid-feedback text-center">{validation.front_image}</div>}
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id='thumbnail-image-back'
                                                    type='file'
                                                    name='thumbnail'
                                                    onChange={this.backImgFileUpload}
                                                    className={`isError` && validation.back_image ? 'is-invalid d-none' : 'd-none'}
                                                />
                                                <Form.Label htmlFor='thumbnail-image-back' className='text-center w-100 m-0'>
                                                    <img src={backImagePath || labelImg} alt='imgUpload' className='m-auto' height='70' /> <br />
                                        Back Side Photo Upload (Max file size: 1MB)
                                    </Form.Label>
                                                {isError && validation.back_image && <div className="invalid-feedback text-center">{validation.back_image}</div>}
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className='float-right'>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className='btn-primary border-none border-radius-0'
                                                disabled={isWait}
                                            >{isWait ? <Loading /> : 'SUBMIT'}</Button>
                                        </Form.Group>
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
export default connect(mapStateToProps, { getBookDetail, updateCoverPhoto })(EbookCoverPhoto)