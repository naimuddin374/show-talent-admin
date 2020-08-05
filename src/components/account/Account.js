import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { getStatus, getDateTime } from '../../util/helper';
import { approveData, rejectData } from '../../store/actions/accountActions';


class Account extends Component {
    state = {
        data: [],
        loading: true,
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = () => {
        this.setState({
            loading: true,
            data: [],
        })
        Axios.get(`${API_URL}api/admin/account`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
    }
    approveHandler = id => {
        let { approveData } = this.props
        approveData(id)
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    rejectHandler = id => {
        let { rejectData } = this.props
        rejectData(id)
        setTimeout(() => {
            this.onFetchData()
        }, 500)
    }
    render() {

        let { data, loading } = this.state
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of Account Statement</h3>
                                    <Link className="btn btn-dark btn-sm float-right" to='/users/edit'><i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Type</th>
                                                <th>Amount</th>
                                                <th>Last Balance</th>
                                                <th>Available Balance</th>
                                                <th>Comment</th>
                                                <th>Status</th>
                                                <th>Created At</th>
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
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => this.approveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>}
                                                            {/* <Link className="btn btn-dark btn-sm mx-2" to={`/posts/edit/${item.id}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link> */}
                                                            {Number(item.status) === 0 &&
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => this.rejectHandler(item.id)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>}
                                                        </td>
                                                        <td>{item.user_name}</td>
                                                        <td>{(Number(item.type) === 1 && 'Credit') || (Number(item.type) === 2 && 'Debit')}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.last_balance}</td>
                                                        <td>{item.available_balance}</td>
                                                        <td>{item.comment}</td>
                                                        <td>{getStatus(item.status)}</td>
                                                        <td>{getDateTime(item.created_at)}</td>
                                                    </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
export default connect(null, { approveData, rejectData })(Account)