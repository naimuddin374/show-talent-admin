import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { API_URL } from '../../store/actions/types'
import Loading from '../layout/Loading';
import { approveData } from '../../store/actions/ebookActions';
import { chapterApprove } from '../../store/actions/chapterActions';
import { getStatus, getDateTime } from '../../util/helper';
import { getBookDetail } from '../../store/actions/ebookActions';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import BookReject from './BookReject';
import ChapterReject from './ChapterReject';


class EbookDetail extends Component {
    state = {
        data: [],
        loading: true,
        dataId: this.props.match.params.dataId,
        isOpen: false,
        isChapterOpen: false,
        chapterId: 0
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
        await this.props.approveData(id)
        this.onFetchData()
    }
    chapterApproveHandler = async id => {
        await this.props.chapterApprove(id)
        this.onFetchData()
    }
    actionIsDone = () => {
        this.setState({
            isOpen: false,
            isChapterOpen: false,
            chapterId: 0
        })
        this.onFetchData()
    }
    render() {
        let { data, loading, isOpen, dataId, isChapterOpen, chapterId } = this.state
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
                                                <th>Status</th>
                                                <th>Created At</th>
                                                <th>Front Image</th>
                                                <th>Back Image</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                            <tbody>
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr>
                                            </tbody> : Object.keys(data).length !== 0 &&
                                            <tbody key={data.id}>
                                                <tr>
                                                    <td>
                                                        {Number(data.status) === 0 &&
                                                            <span>
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => this.approveHandler(data.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                                <Link className="btn btn-dark btn-sm" to={`/ebook/edit/${data.id}/${data.name}`}>
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true })}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </span>}
                                                    </td>
                                                    <td>{data.page ? data.page.name : data.user.name}</td>
                                                    <td>{data.category.name}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.author_name}</td>
                                                    <td>{data.publication_date}</td>
                                                    <td>{getStatus(data.status)}</td>
                                                    <td>{getDateTime(data.created_at)}</td>
                                                    <td>{data.front_image && <img src={API_URL + data.front_image} width='100' alt='Cover' />}</td>
                                                    <td>{data.back_image && <img src={API_URL + data.back_image} width='100' alt='Cover' />}</td>
                                                </tr>
                                                {data.preface && <tr><td>Preface:</td><td colSpan="10">{data.preface}</td></tr>}
                                                {data.summary && <tr><td>Summary:</td><td colSpan="10">{data.summary}</td></tr>}
                                                {data.author_summary && <tr><td>Author Summary:</td><td colSpan="10">{data.author_summary}</td></tr>}
                                                {data.reject_note && <tr><td className='text-danger'>Reject Note:</td><td colSpan="10">{data.reject_note}</td></tr>}
                                            </tbody>}

                                    </table>

                                    <div className="card-header">
                                        <h3 className="card-title"><b>List of Chapter</b></h3>
                                    </div>
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Sequence</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>

                                        {loading ?
                                            <tbody>
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr> </tbody> : data.chapter.length > 0 && data.chapter.map(item => <tbody key={item.id}> <tr>
                                                    <td>
                                                        {Number(item.status) === 0 &&
                                                            <span>
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.chapterApproveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                                <Link className="btn btn-dark btn-sm" to={`/ebook/chapter/edit/${item.id}/${item.name}`}>
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.setState({ isChapterOpen: true, chapterId: item.id })}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </span>}
                                                    </td>
                                                    <td>{item.sequence}</td>
                                                    <td>{item.name}</td>
                                                    <td>{getStatus(item.status)}</td>
                                                    <td>{getDateTime(item.created_at)}</td>
                                                </tr>
                                                    {item.description && <tr><td colSpan='10'>{renderHTML(item.description)}</td></tr>}
                                                    {item.reject_note && <tr><td className='text-danger'>Reject Note:</td><td colSpan="10">{item.reject_note}</td></tr>}
                                                </tbody>)}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {isOpen && <BookReject
                    isOpen={isOpen}
                    closeHandler={() => this.setState({ isOpen: false })}
                    actionIsDone={this.actionIsDone.bind(this)}
                    dataId={dataId}
                />}
                {isChapterOpen && chapterId && <ChapterReject
                    isOpen={isChapterOpen}
                    closeHandler={() => this.setState({ isChapterOpen: false, chapterId: 0 })}
                    actionIsDone={this.actionIsDone.bind(this)}
                    dataId={chapterId}
                />}
            </Fragment>
        )
    }
}
export default connect(null, { approveData, chapterApprove, getBookDetail })(EbookDetail)