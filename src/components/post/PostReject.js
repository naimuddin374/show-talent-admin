import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { rejectData } from '../../store/actions/postActions';
import { Form, Row, Button, Modal, Col } from 'react-bootstrap';
import Loading from '../layout/Loading';


class PostReject extends Component {
    state = {
        id: this.props.dataId || '',
        reject_note: '',
        validation: ''
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    submitHandler = async event => {
        event.preventDefault()
        let { id, reject_note } = this.state
        if (!reject_note) {
            this.setState({
                validation: 'Please enter reject note.'
            })
            return false
        }
        this.setState({ isWait: true, validation: '' })
        let { rejectData, actionIsDone } = this.props
        let response = await rejectData(id, { reject_note });
        response && actionIsDone()
        this.setState({ isWait: false })
    }
    render() {
        let { isOpen, closeHandler } = this.props
        let { reject_note, validation, isWait } = this.state
        return (
            <Fragment>
                <Modal show={isOpen} onHide={closeHandler} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>Reject Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border pt-0'>
                        <Form onSubmit={this.submitHandler}>
                            <div className="content-post-area">
                                <Form.Group as={Row}>
                                    <Form.Control
                                        as='textarea'
                                        rows='10'
                                        type='text'
                                        name='reject_note'
                                        placeholder='Reject Note'
                                        value={reject_note}
                                        onChange={this.changeHandler}
                                        className={validation && 'is-invalid'}
                                    />
                                    {validation && <div className="invalid-feedback">{validation}</div>}
                                </Form.Group>
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
export default connect(null, { rejectData })(PostReject);