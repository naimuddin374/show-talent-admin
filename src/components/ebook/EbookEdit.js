import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { updateData, getBookDetail } from '../../store/actions/ebookActions'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ebookValidate from '../validators/ebookValidate';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';
import Loading from '../layout/Loading';
import { getAllCategory } from '../../store/actions/categoryActions';


class EbookEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.dataId || null,
            validation: {},
            category_id: 0,
            name: '',
            author_name: '',
            publication_date: null,
            preface: '',
            summary: '',
            author_summary: '',
            categories: []
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            let response = await this.props.getBookDetail(id)
            let { category_id, name, author_name, publication_date, preface, summary, author_summary } = response
            this.setState({
                category_id, name, author_name, publication_date, preface, summary, author_summary, categories: await this.props.getAllCategory()
            })
        }
    }
    changeHandler = event => {
        let { validation } = this.state
        delete validation[event.target.name]
        this.setState({
            [event.target.name]: event.target.value,
            validation
        })
    }
    startDateHandler = date => {
        let { validation } = this.state
        delete validation['publication_date']
        this.setState({
            publication_date: dateFormat(date, "yyyy-mm-dd"),
            validation
        })
    }
    submitHandler = async event => {
        event.preventDefault()
        let validate = ebookValidate(this.state)
        if (Object.keys(validate).length !== 0) {
            this.setState({ validation: validate, isError: true })
            return false
        }
        this.setState({ isWait: true, isError: false })
        let { id, name } = this.state
        let response = await this.props.updateData(this.state, id);
        if (response) this.props.history.push(`/ebook/cover/photo/${id}/${name}`)
        this.setState({ isWait: false })
    }
    render() {
        let { isWait, isError, validation, name, author_name, publication_date, preface, summary, author_summary, categories, category_id } = this.state
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <h3 className='float-left'>Edit Ebook Information</h3>
                                    <Link className="btn btn-dark btn-sm float-right" to='/ebook/list'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Control
                                                as='select'
                                                name='category_id'
                                                custom
                                                value={category_id}
                                                onChange={this.changeHandler}
                                                className={isError && validation.category_id && 'is-invalid'}
                                            >
                                                <option value=''>Select Category</option>
                                                {categories.length > 0 && categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                            </Form.Control>
                                            {isError && validation.category_id && <div className="invalid-feedback">{validation.category_id}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                type='text'
                                                name='name'
                                                placeholder='Write Your E-Book Name'
                                                value={name}
                                                onChange={this.changeHandler}
                                                className={isError && validation.name && 'is-invalid'}
                                            />
                                            {isError && validation.name && <div className="invalid-feedback">{validation.name}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                type='text'
                                                name='author_name'
                                                placeholder='The Name of The Author'
                                                value={author_name}
                                                onChange={this.changeHandler}
                                                className={isError && validation.author_name && 'is-invalid'}
                                            />
                                            {isError && validation.author_name && <div className="invalid-feedback">{validation.author_name}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <DatePicker
                                                className={(isError && validation.publication_date) ? 'form-control is-invalid' : 'form-control'}
                                                selected={publication_date && new Date(publication_date)}
                                                onChange={this.startDateHandler}
                                                minDate={new Date()}
                                                dateFormat="dd MMMM yyyy"
                                                id='publication_date'
                                                autocomplete='false'
                                                placeholderText='Date of Publication'
                                            />
                                            {isError && validation.publication_date && <div className="invalid-feedback">{validation.publication_date}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                rows="7"
                                                type='text'
                                                name='preface'
                                                placeholder='Preface'
                                                value={preface}
                                                onChange={this.changeHandler}
                                                className={isError && validation.preface && 'is-invalid'}
                                            />
                                            {isError && validation.preface && <div className="invalid-feedback">{validation.preface}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                rows="7"
                                                type='text'
                                                name='summary'
                                                placeholder='Write Summary of Book'
                                                value={summary}
                                                onChange={this.changeHandler}
                                                className={isError && validation.summary && 'is-invalid'}
                                            />
                                            {isError && validation.summary && <div className="invalid-feedback">{validation.summary}</div>}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Control
                                                as="textarea"
                                                rows="7"
                                                type='text'
                                                name='author_summary'
                                                placeholder='Write Something About Author'
                                                value={author_summary}
                                                onChange={this.changeHandler}
                                                className={isError && validation.author_summary && 'is-invalid'}
                                            />
                                            {isError && validation.author_summary && <div className="invalid-feedback">{validation.author_summary}</div>}
                                        </Form.Group>
                                        <Form.Group className='float-right'>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className='btn-primary border-none border-radius-0'
                                                disabled={isWait}
                                            >{isWait ? <Loading /> : 'NEXT'}</Button>
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
export default connect(null, { updateData, getBookDetail, getAllCategory })(EbookEdit)