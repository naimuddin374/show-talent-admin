import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { rejectData } from '../../store/actions/classifiedActions';
import { Form, Row, Button, Modal } from 'react-bootstrap';
import Loading from '../layout/Loading';
import rejectValidate from '../validators/rejectValidate';


class ClassifiedReject extends Component {
    state = {
        id: this.props.dataId || '',
        reject_note: '',
        reject_reason: '',
        validation: {},
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    submitHandler = async event => {
        event.preventDefault()

        let validate = rejectValidate(this.state)
        if (Object.keys(validate).length !== 0) {
            this.setState({ validation: validate, isError: true })
            return false
        }

        this.setState({ isWait: true, validation: {} })
        let { rejectData, actionIsDone } = this.props

        let { id, reject_note, reject_reason } = this.state

        if (reject_reason !== 'other') {
            reject_note = reject_reason
        }
        let response = await rejectData(id, { reject_note });
        response && actionIsDone()
        this.setState({ isWait: false })
    }
    render() {
        let { isOpen, closeHandler } = this.props
        let { reject_note, validation, isWait, reject_reason } = this.state

        return (
            <Fragment>
                <Modal show={isOpen} onHide={closeHandler} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Classified Reject</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border pt-0'>
                        <Form onSubmit={this.submitHandler}>
                            <div className="content-post-area">
                                <Form.Group>
                                    <Form.Control
                                        custom
                                        id='offensiveContent'
                                        type='checkbox'
                                        checked={reject_reason === 'Offensive Content'}
                                        onChange={() => this.setState({ reject_reason: 'Offensive Content' })}
                                        className={validation.reject_reason ? 'is-invalid mr-2' : 'mr-2'}
                                    />
                                    <Form.Label htmlFor='offensiveContent'>Offensive Content</Form.Label>
                                    {validation && <div className="invalid-feedback">Please provide any reason.</div>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        custom
                                        id='policyViolation'
                                        type='checkbox'
                                        checked={reject_reason === 'Policy Violation'}
                                        onChange={() => this.setState({ reject_reason: 'Policy Violation' })}
                                        className='mr-2'
                                    />
                                    <Form.Label htmlFor='policyViolation'>Policy Violation</Form.Label>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        custom
                                        id='other'
                                        type='checkbox'
                                        checked={reject_reason === 'other'}
                                        onChange={() => this.setState({ reject_reason: 'other' })}
                                        className='mr-2'
                                    />
                                    <Form.Label htmlFor='other'>Other</Form.Label>
                                </Form.Group>


                                {reject_reason === 'other' &&
                                    <Form.Group as={Row}>
                                        <Form.Control
                                            as='textarea'
                                            rows='10'
                                            type='text'
                                            name='reject_note'
                                            placeholder='Reject Note'
                                            value={reject_note}
                                            onChange={this.changeHandler}
                                            className={validation.reject_note && 'is-invalid'}
                                        />
                                        {validation.reject_note && <div className="invalid-feedback">{validation.reject_note}</div>}
                                    </Form.Group>}

                                <Form.Group as={Row}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className='btn-primary border-none'
                                        disabled={isWait}
                                        block
                                    >{isWait ? <Loading /> : 'Submit'}</Button>
                                </Form.Group>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}
export default connect(null, { rejectData })(ClassifiedReject);