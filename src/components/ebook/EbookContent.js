import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';


class EbookContent extends Component {
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
        Axios.get(`${API_URL}api/admin/ebook`)
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
                                    <h3 className="card-title">List of Ebook</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Author Name</th>
                                                <th>Language</th>
                                                <th>Title</th>
                                                <th>Publication Date</th>
                                                <th>Price</th>
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
                                                            {/* {Number(item.status) === 0 &&
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => this.approveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>} */}
                                                            <Link className="btn btn-dark btn-sm mx-2" to={`/ebook/edit/${item.id}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            <Link className="btn btn-dark btn-sm mx-2" to={`/ebook/detail/${item.id}`}>
                                                                <i className="fa fa-eye"></i>
                                                            </Link>
                                                            {/* {Number(item.status) === 0 &&
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => this.rejectHandler(item.id)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>} */}
                                                        </td>
                                                        <td>{item.user_name}</td>
                                                        <td>{item.cat_name}</td>
                                                        <td>{item.author_name}</td>
                                                        <td>{item.language}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.publication_date}</td>
                                                        <td>{item.price}</td>
                                                        <td>{(Number(item.status) === 0 && "Pending") || (Number(item.status) === 1 && "Active") || (Number(item.status) === 2 && "Rejected")}</td>
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
export default connect(null)(EbookContent)