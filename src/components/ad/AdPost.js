import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { getStatus, getDateTime } from '../../util/helper';
import { approveData, rejectData } from '../../store/actions/adActions';



class AdPost extends Component {
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
        Axios.get(`${API_URL}api/admin/posted-ad`)
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
                                    <h3 className="card-title">List of Ad</h3>
                                    <Link className="btn btn-dark btn-sm float-right" to='/users/edit'><i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Title</th>
                                                <th>Image</th>
                                                <th>Video</th>
                                                <th>Hyperlink</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
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
                                                        <td>{item.title}</td>
                                                        <td>{item.image && <a href={API_URL + item.image}><img src={API_URL + item.image} alt height="100" /></a>}</td>
                                                        <td><a href={item.video} target="_blank">{item.video}</a></td>
                                                        <td><a href={item.Hyperlink} target="_blank">{item.Hyperlink}</a></td>
                                                        <td>{item.start_date}</td>
                                                        <td>{item.end_date}</td>
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
export default connect(null, { approveData, rejectData })(AdPost)