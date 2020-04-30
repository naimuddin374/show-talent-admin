import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { approveData, rejectData } from '../../store/actions/postActions';
import { getStatus } from '../../util/helper';


class ImagePost extends Component {
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
        Axios.get(`${API_URL}api/admin/get-post/5`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.error(error))
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
                                    <h3 className="card-title">List of Image</h3>
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
                                                </tr> : Object.keys(data).length !== 0 && data.map(item =>
                                                    <tr key={item.id}>
                                                        <td>
                                                            {Number(item.status) === 0 &&
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => this.approveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>}
                                                            <Link className="btn btn-dark btn-sm mx-2" to={`/posts/edit/${item.id}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            {Number(item.status) === 0 &&
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => this.rejectHandler(item.id)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>}
                                                        </td>
                                                        <td>{item.user_name}</td>
                                                        <td>{item.cat_name}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.image && <a href={API_URL + item.image}><img src={API_URL + item.image} height="60" alt="" /></a>}</td>
                                                        <td>{getStatus(item.status)}</td>
                                                        <td>{item.created_at}</td>
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
export default connect(null, { approveData, rejectData })(ImagePost)