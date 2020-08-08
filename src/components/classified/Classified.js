import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import { approveData, rejectData, getAllClassified, classifiedUnpublished, deleteClassified } from '../../store/actions/classifiedActions';
import { getStatus, getDateTime, getAuthorName } from '../../util/helper';
import renderHTML from 'react-render-html';
import { API_URL } from '../../store/actions/types';
import ClassifiedReject from './ClassifiedReject';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap';


class Classified extends Component {
    state = {
        data: [],
        loading: true,
        isOpen: false,
        dataId: '',
        postStatus: null,
        createdBy: null
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async () => {
        this.setState({
            loading: true,
            data: [],
        })
        this.setState({
            data: await this.props.getAllClassified(),
            loading: false
        })
    }
    actionIsDone = () => {
        this.setState({
            isOpen: false,
            dataId: '',
        })
        this.onFetchData()
    }
    approveHandler = async id => {
        let points = prompt('Enter Reward Point', 0);
        if (points) {
            await this.props.approveData(id, { points })
            this.onFetchData()
        }
    }
    removeHandler = async id => {
        await this.props.deleteClassified(id)
        this.onFetchData()
    }
    unpublishedHandler = async id => {
        await this.props.classifiedUnpublished(id)
        this.onFetchData()
    }
    render() {
        let { data, loading, dataId, isOpen, postStatus, createdBy } = this.state

        if (postStatus != null) {
            data = data.filter(item => Number(item.status) === postStatus)
        } else {
            if (createdBy === 'user') {
                data = data.filter(item => item.page === null)
            } else if (createdBy === 'page') {
                data = data.filter(item => item.page !== null)
            }
        }
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of Classified</h3>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: null, createdBy: null })}>Reset</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ createdBy: 'user' })}>User Created</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ createdBy: 'page' })}>Page Created</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 0 })}>Pending</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 1 })}>Approved</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 2 })}>Rejected</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 3 })}>Unpublished</button>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                <th>Image</th>
                                                <th>Contact</th>
                                                <th>Address</th>
                                                <th>Status</th>
                                                <th>Points</th>
                                                <th>Created At</th>
                                                <th>Reject Note</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                            <tbody>
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr>
                                            </tbody> : data.length > 0 && data.map(item =>
                                                <tbody key={item.id}>
                                                    <tr>
                                                        <td>
                                                            <DropdownButton id="dropdown-basic-button" title="Action">
                                                                <Dropdown.Item href={`/classified/edit/${item.id}/${item.title}`}>Edit</Dropdown.Item>
                                                                {item.status !== 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>Approve</Dropdown.Item>}
                                                                {item.status === 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.unpublishedHandler(item.id)}>Unpublished</Dropdown.Item>}
                                                                {item.status === 0 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true, dataId: item.id })}>Reject</Dropdown.Item>}
                                                                <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.removeHandler(item.id)}>Delete</Dropdown.Item>
                                                            </DropdownButton>
                                                        </td>
                                                        <td>{getAuthorName(item.user, item.page)}</td>
                                                        <td>{item.category && item.category.name}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.image && <img src={API_URL + item.image} alt='Pic' width='100' />}</td>
                                                        <td>{item.contact}<br />{item.email}</td>
                                                        <td>{item.address}</td>
                                                        <td>{getStatus(item.status)}</td>
                                                        <td>{item.points}</td>
                                                        <td>{getDateTime(item.created_at)}</td>
                                                        <td>{item.reject_note}</td>
                                                    </tr>
                                                    {item.description && <tr><td colSpan="10">{renderHTML(item.description)}</td></tr>}
                                                    {/* {item.reject_note && <tr className='tr-border'><td className='text-danger'>Reject Note:</td><td colSpan="10">{item.reject_note}</td></tr>} */}
                                                </tbody>)}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {isOpen && <ClassifiedReject
                    isOpen={isOpen}
                    closeHandler={() => this.setState({ isOpen: false, dataId: '' })}
                    actionIsDone={this.actionIsDone.bind(this)}
                    dataId={dataId}
                />}
            </Fragment>
        )
    }
}
export default connect(null, { approveData, rejectData, getAllClassified, classifiedUnpublished, deleteClassified })(Classified)