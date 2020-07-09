import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import { approveData, rejectData, getAllClassified } from '../../store/actions/classifiedActions';
import { getStatus, getDateTime } from '../../util/helper';
import renderHTML from 'react-render-html';
import { API_URL } from '../../store/actions/types';
import ClassifiedReject from './ClassifiedReject';


class Classified extends Component {
    state = {
        data: [],
        loading: true,
        isOpen: false,
        dataId: ''
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

        let { data, loading, dataId, isOpen } = this.state
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of Classified</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
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
                                                <th>Created At</th>
                                                <th>Reject Note</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr> : data.length > 0 && data.map(item =>
                                                    <tr key={item.id}>
                                                        <td>
                                                            {Number(item.status) === 0 &&
                                                                <div>
                                                                    <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>
                                                                        <i className="fa fa-check"></i>
                                                                    </a>

                                                                    <Link className="btn btn-dark btn-sm my-2" to={`/classified/edit/${item.id}/${item.title}`}>
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>


                                                                    <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true, dataId: item.id })}>
                                                                        <i className="fa fa-times"></i>
                                                                    </a>
                                                                </div>}
                                                        </td>
                                                        <td>{item.page ? item.page.name : item.user.name}</td>
                                                        <td>{item.category && item.category.name}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.image && <img src={API_URL + item.image} alt='Pic' width='100' />}</td>
                                                        <td>{item.contact}<br />{item.email}</td>
                                                        <td>{item.address}</td>
                                                        <td>{getStatus(item.status)}</td>
                                                        <td>{getDateTime(item.created_at)}</td>
                                                        <td>{item.reject_note}</td>
                                                        <td>{item.description && renderHTML(item.description)}</td>
                                                    </tr>)}
                                        </tbody>
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
export default connect(null, { approveData, rejectData, getAllClassified })(Classified)