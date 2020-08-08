import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import { getAllPage, approveData, deletePage, pageUnpublished } from '../../store/actions/pageActions';
import { API_URL } from '../../store/actions/types';
import noImg from '../assets/images/no-img.jpg';
import { getDateTime, getStatus, getAuthorName } from '../../util/helper';
import PageReject from './PageReject';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap';


class Page extends Component {
    state = {
        data: [],
        loading: true,
        postStatus: null
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async () => {
        this.setState({
            data: await this.props.getAllPage(),
            loading: false
        })
    }
    approveHandler = async id => {
        let { approveData } = this.props
        await approveData(id)
        this.onFetchData()
    }
    removeHandler = async id => {
        await this.props.deletePage(id)
        this.onFetchData()
    }
    unpublishedHandler = async id => {
        await this.props.pageUnpublished(id)
        this.onFetchData()
    }
    actionIsDone = () => {
        this.setState({
            isOpen: false,
            dataId: '',
        })
        this.onFetchData()
    }
    render() {
        let { data, loading, postStatus, isOpen, dataId } = this.state

        if (postStatus != null) {
            data = data.filter(item => Number(item.status) === postStatus)
        }

        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of Pages</h3>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: null })}>Reset</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 0 })}>Pending</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 1 })}>Approved</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 2 })}>Rejected</button>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Owner Name</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Category</th>
                                                <th>Status</th>
                                                <th>Created At</th>
                                                <th>Reject Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr> : Object.keys(data).length !== 0 && data.map(item =>
                                                    <tr key={item.id} title={`Bio: ` + item.bio}>
                                                        <td>
                                                            <DropdownButton id="dropdown-basic-button" title="Action">
                                                                <Dropdown.Item href={`/pages/create/${item.id}/${item.name}`}>Edit</Dropdown.Item>
                                                                {item.status !== 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>Approve</Dropdown.Item>}
                                                                {item.status === 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.unpublishedHandler(item.id)}>Unpublished</Dropdown.Item>}
                                                                {item.status === 0 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true, dataId: item.id })}>Reject</Dropdown.Item>}
                                                                <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.removeHandler(item.id)}>Delete</Dropdown.Item>
                                                            </DropdownButton>
                                                        </td>
                                                        <td>{getAuthorName(item.user)}</td>
                                                        <td><img src={item.image ? API_URL + item.image : noImg} alt='Profile' width='100' /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.contact}</td>
                                                        <td>{item.category.name}</td>
                                                        <td>{getStatus(item.status)}</td>
                                                        <td>{getDateTime(item.created_at)}</td>
                                                        <td>{item.reject_note}</td>
                                                    </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {isOpen && <PageReject
                    isOpen={isOpen}
                    closeHandler={() => this.setState({ isOpen: false, dataId: '' })}
                    actionIsDone={this.actionIsDone.bind(this)}
                    dataId={dataId}
                />}
            </Fragment>
        )
    }
}
export default connect(null, { getAllPage, approveData, deletePage, pageUnpublished })(Page)