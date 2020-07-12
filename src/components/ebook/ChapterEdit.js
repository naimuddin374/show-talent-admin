import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import chapterValidate from '../validators/chapterValidate';
import Loading from '../layout/Loading';
import { getChapterDetail, updateData } from '../../store/actions/chapterActions';

// Textarea
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
window.jQuery = $;
require('bootstrap');


class ChapterEdit extends Component {
    state = {
        isError: false,
        isWait: false,
        dataId: this.props.match.params.dataId,
        ebook_id: '',
        sequence: '',
        name: '',
        description: '',
        validation: {}
    }
    async componentDidMount() {
        let { dataId } = this.state
        let response = await this.props.getChapterDetail(dataId)
        let { ebook_id, name, description, sequence } = response
        this.setState({ ebook_id, name, description, sequence })
    }
    changeHandler = event => {
        let { validation } = this.state
        delete validation[event.target.name]
        this.setState({
            [event.target.name]: event.target.value,
            validation
        })
    }
    submitHandler = async event => {
        event.preventDefault()
        let validate = chapterValidate(this.state)
        if (Object.keys(validate).length !== 0) {
            this.setState({ validation: validate, isError: true })
            return false
        }
        this.setState({ isWait: true, isError: false })
        let { updateData, history } = this.props
        let { dataId, ebook_id, name } = this.state
        let response = await updateData(this.state, dataId);
        if (response) history.push(`/ebook/detail/${ebook_id}/${name}`)
        this.setState({ isWait: false })
    }
    render() {
        let { isWait, isError, validation, name, description, sequence } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <h3 className='float-left'>Edit Chapter</h3>
                                    <Link className="btn btn-dark btn-sm float-right" to='/ebook/list'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Control
                                                type='number'
                                                name='sequence'
                                                placeholder='Chapter Sequence'
                                                value={sequence}
                                                onChange={this.changeHandler}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                type='text'
                                                name='name'
                                                placeholder='Write Your Chapter Name'
                                                value={name}
                                                onChange={this.changeHandler}
                                                className={isError && validation.name && 'is-invalid'}
                                            />
                                            {isError && validation.name && <div className="invalid-feedback">{validation.name}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <ReactSummernote
                                                value={description}
                                                className='w-100'
                                                options={{
                                                    lang: 'ru-RU',
                                                    height: 300,
                                                    dialogsInBody: true,
                                                    toolbar: [
                                                        ['font', ['bold', 'underline', 'clear', 'italic']],
                                                    ],
                                                }}
                                                onChange={(description) => this.setState({ description })}
                                            />
                                            {isError && validation.description && <div className="invalid-feedback">{validation.description}</div>}
                                        </Form.Group>
                                        <Form.Group className='float-right'>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className='btn-primary border-none border-radius-0 text-white'
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
export default connect(null, { updateData, getChapterDetail })(ChapterEdit)