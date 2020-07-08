import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { API_URL } from '../../store/actions/types'
import Loading from '../layout/Loading';
import { approveData, rejectData } from '../../store/actions/chapterActions';
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
    render() {
        let { data, loading } = this.state
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of Chapter</h3>
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
                                                <th>No of Chapter</th>
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
                                                            <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(data.id)}>
                                                                <i className="fa fa-check"></i>
                                                            </a>}
                                                        {/* <Link className="btn btn-dark btn-sm mx-2" to={`/posts/edit/${data.id}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link> */}
                                                        {Number(data.status) === 0 &&
                                                            <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.rejectHandler(data.id)}>
                                                                <i className="fa fa-times"></i>
                                                            </a>}
                                                    </td>
                                                    <td>{data.page ? data.page.name : data.user.name}</td>
                                                    <td>{data.category.name}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.author_name}</td>
                                                    <td>{data.publication_date}</td>
                                                    <td>{data.preface}</td>
                                                    <td>{data.summary}</td>
                                                    <td>{data.author_summary}</td>
                                                    <td>
                                                        <Link to={`/ebook/detail/${data.id}`}>
                                                            {data.chapter.length}
                                                        </Link>
                                                    </td>
                                                    <td>{getStatus(data.status)}</td>
                                                    <td>{getDateTime(data.created_at)}</td>
                                                    <td>{data.front_image && <img src={API_URL + data.front_image} width='100' alt='Cover' />}</td>
                                                    <td>{data.back_image && <img src={API_URL + data.back_image} width='100' alt='Cover' />}</td>
                                                </tr>}
                                        </tbody>
                                    </table>

                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Sequence</th>
                                                <th>Name</th>
                                                <th>Description</th>
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
                                                </tr> : data.chapter.length > 0 && data.chapter.map(item => <tr key={data.id}>
                                                    <td>
                                                        {Number(item.status) === 0 &&
                                                            <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>
                                                                <i className="fa fa-check"></i>
                                                            </a>}
                                                        {Number(item.status) === 0 &&
                                                            <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.rejectHandler(item.id)}>
                                                                <i className="fa fa-times"></i>
                                                            </a>}
                                                    </td>
                                                    <td>{item.sequence}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.description && renderHTML(item.description)}</td>
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
export default connect(null, { approveData, rejectData, getBookDetail })(EbookDetail)