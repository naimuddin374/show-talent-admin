import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { approveComment, rejectData } from '../../store/actions/postCommentActions';
import { getStatus } from '../../util/helper';


class ContentPost extends Component {
    state = {
        data: [],
        loading: true,
        postId: this.props.match.params.id
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = () => {
        let { postId } = this.state

        this.setState({
            loading: true,
            data: [],
        })
        Axios.get(`${API_URL}api/comment/by-user/${postId}`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.error(error.response))
    }
    approveHandler = id => {
        let { approveComment } = this.props
        approveComment(id)
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
                                    <h3 className="card-title">List of Comment</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Post Title</th>
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
                                                </tr> : Object.keys(data).length !== 0 && data.map(item =>
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
                                                        <td>{item.post_title}</td>
                                                        <td>{item.comment}</td>
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
export default connect(null, { approveComment, rejectData })(ContentPost)