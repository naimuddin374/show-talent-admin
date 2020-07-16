import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import { getAllPage, approveData } from '../../store/actions/pageActions';
import { API_URL } from '../../store/actions/types';
import noImg from '../assets/images/no-img.jpg';
import { getDateTime } from '../../util/helper';
import PageReject from './PageReject';

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
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 0 })}>Pending</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 1 })}>Approved</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 2 })}>Rejected</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: null })}>Reset</button>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
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
                                                    <tr key={item.id} title={item.bio}>
                                                        <td>
                                                            <Link className="btn btn-dark btn-sm" to={`/pages/create/${item.id}/${item.name}`}><i className="fa fa-edit"></i></Link>

                                                            {Number(item.status) === 0 &&
                                                                <span>
                                                                    <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>
                                                                        <i className="fa fa-check"></i>
                                                                    </a>
                                                                    <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true, dataId: item.id })}>
                                                                        <i className="fa fa-times"></i>
                                                                    </a>
                                                                </span>
                                                            }
                                                        </td>
                                                        <td><img src={item.image ? API_URL + item.image : noImg} alt='Profile' width='100' /></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.contact}</td>
                                                        <td>{item.category.name}</td>
                                                        <td>{(Number(item.status) === 0 && "Pending") || (Number(item.status) === 1 && "Active") || (Number(item.status) === 2 && "Blocked")}</td>
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
export default connect(null, { getAllPage, approveData })(Page)