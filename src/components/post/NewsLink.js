import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { approveData, rejectData, getAllPost } from '../../store/actions/postActions';
import { getStatus } from '../../util/helper';
import renderHTML from 'react-render-html';
import { ReactTinyLink } from 'react-tiny-link'


class NewsLink extends Component {
    state = {
        data: [],
        loading: true,
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async () => {
        this.setState({
            loading: true,
            data: [],
        })
        let response = await this.props.getAllPost()
        if (response) {
            this.setState({
                data: response.filter(item => item.type === 2),
                loading: false
            })
        }
    }
    approveHandler = async id => {
        let { approveData } = this.props
        await approveData(id)
        this.onFetchData()
    }
    rejectHandler = async id => {
        let { rejectData } = this.props
        await rejectData(id)
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
                                    <h3 className="card-title">List of News Link</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>News Link</th>
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
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>}

                                                            {/* <Link className="btn btn-dark btn-sm mx-2" to={`/comment/post/${item.id}`}>
                                                                <i className="fa fa-comments"></i>
                                                            </Link> */}

                                                            <Link className="btn btn-dark btn-sm mx-2" to={`/posts/edit/${item.id}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>


                                                            {Number(item.status) === 0 &&
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.rejectHandler(item.id)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>}
                                                        </td>
                                                        <td>{item.page ? item.page.name : item.user.name}</td>
                                                        <td>{item.category.name}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.description && renderHTML(item.description)}</td>
                                                        <td>
                                                            {(item.newslink && item.newslink.length > 20 && item.type === 2) && <a href={item.newslink} target='_blank' >
                                                                <ReactTinyLink
                                                                    cardSize="large"
                                                                    showGraphic={true}
                                                                    maxLine={2}
                                                                    minLine={1}
                                                                    url={item.newslink}
                                                                    loadSecureUrl={true}
                                                                    width='100%'
                                                                /></a>}
                                                        </td>
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
export default connect(null, { approveData, rejectData, getAllPost })(NewsLink)