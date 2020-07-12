import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { API_URL } from '../../store/actions/types'
import Loading from '../layout/Loading';
import { approveData, rejectData } from '../../store/actions/ebookActions';
import { chapterApprove, chapterReject } from '../../store/actions/chapterActions';
import { getStatus, getDateTime } from '../../util/helper';
import { getBookDetail } from '../../store/actions/ebookActions';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';


class EbookDetail extends Component {
    state = {
        data: [],
        loading: true,
        dataId: this.props.match.params.dataId
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async () => {
        let { dataId } = this.state
        this.setState({
            loading: true,
            data: [],
        })
        this.setState({
            loading: false,
            data: await this.props.getBookDetail(dataId),
        })
    }
    approveHandler = async id => {
        let { approveData } = this.props
        approveData(id)
        await this.onFetchData()
    }
    rejectHandler = async id => {
        let { rejectData } = this.props
        rejectData(id)
        await this.onFetchData()
    }
    chapterApproveHandler = async id => {
        let { chapterApprove } = this.props
        chapterApprove(id)
        await this.onFetchData()
    }
    chapterRejectHandler = async id => {
        let { chapterReject } = this.props
        chapterReject(id)
        await this.onFetchData()
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
                                    <h3 className="card-title">Ebook Detail Information</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Name</th>
                                                <th>Author Name</th>
                                                <th>Publication Date</th>
                                                <th>Preface</th>
                                                <th>Summary</th>
                                                <th>Author Summary</th>
                                                <th>Status</th>
                                                <th>Created At</th>
                                                <th>Front Image</th>
                                                <th>Back Image</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr> : Object.keys(data).length !== 0 &&
                                                <tr key={data.id}>
                                                    <td>
                                                        {Number(data.status) === 0 &&
                                                            <span>
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => this.approveHandler(data.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                                <Link className="btn btn-dark btn-sm my-2" to={`/ebook/edit/${data.id}/${data.name}`}>
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => this.rejectHandler(data.id)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </span>}
                                                    </td>
                                                    <td>{data.page ? data.page.name : data.user.name}</td>
                                                    <td>{data.category.name}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.author_name}</td>
                                                    <td>{data.publication_date}</td>
                                                    <td>{data.preface}</td>
                                                    <td>{data.summary}</td>
                                                    <td>{data.author_summary}</td>
                                                    <td>{getStatus(data.status)}</td>
                                                    <td>{getDateTime(data.created_at)}</td>
                                                    <td>{data.front_image && <img src={API_URL + data.front_image} width='100' alt='Cover' />}</td>
                                                    <td>{data.back_image && <img src={API_URL + data.back_image} width='100' alt='Cover' />}</td>
                                                </tr>}
                                        </tbody>
                                    </table>

                                    <div className="card-header">
                                        <h3 className="card-title">List of Chapter</h3>
                                    </div>
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Sequence</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Created At</th>
                                                <th>Ebook</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr> : data.chapter.length > 0 && data.chapter.map(item => <tr key={data.id}>
                                                    <td>
                                                        {Number(item.status) === 0 &&
                                                            <span>
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.chapterApproveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                                <Link className="btn btn-dark btn-sm my-2" to={`/ebook/chapter/edit/${item.id}/${item.name}`}>
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.chapterReject(item.id)}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </span>}
                                                    </td>
                                                    <td>{item.sequence}</td>
                                                    <td>{item.name}</td>
                                                    <td>{getStatus(item.status)}</td>
                                                    <td>{getDateTime(item.created_at)}</td>
                                                    <td>{item.description && renderHTML(item.description)}</td>
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
export default connect(null, { approveData, rejectData, chapterApprove, chapterReject, getBookDetail })(EbookDetail)