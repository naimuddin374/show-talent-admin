import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { approveData, rejectData, getPostDetail } from '../../store/actions/postActions';
import { getStatus, getVideoLink, getDateTime } from '../../util/helper';
import renderHTML from 'react-render-html';
import { ReactTinyLink } from 'react-tiny-link'
import { API_URL } from '../../store/actions/types';
import PostReject from './PostReject';
import { approveComment } from '../../store/actions/postCommentActions';
import PostCommentReject from './PostCommentReject';


class PostDetail extends Component {
    state = {
        data: {},
        loading: true,
        isOpen: false,
        dataId: this.props.match.params.dataId,
        type: '',
        isCommentOpen: false,
        commentId: ''
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async () => {
        let { dataId } = this.state
        this.setState({
            loading: true,
            data: {}
        })
        let response = await this.props.getPostDetail(dataId)
        this.setState({
            data: response,
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
            isCommentOpen: false,
            commentId: ''
        })
        this.onFetchData()
    }
    commentApproveHandler = async id => {
        await this.props.approveComment(id)
        this.onFetchData()
    }
    render() {

        let { data, loading, dataId, isOpen, isCommentOpen, commentId } = this.state
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Post Detail information</h3>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                {data.type === 2 && <th>News Link</th>}
                                                {data.type === 4 && <th>Video</th>}
                                                {data.type === 5 && <th>Image</th>}
                                                <th>Status</th>
                                                <th>No of Like</th>
                                                <th>No of Comment</th>
                                                <th>Created At</th>
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
                                                            <div>
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.approveHandler(data.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>

                                                                <Link className="btn btn-dark btn-sm my-2" to={`/posts/edit/${data.id}/${data.title}`}>
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>

                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true, dataId: data.id })}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </div>}
                                                    </td>
                                                    <td>{data.page ? data.page.name : data.user.name}</td>
                                                    <td>{data.category.name}</td>
                                                    <td>{data.title}</td>
                                                    {data.type === 2 && <td>
                                                        {(data.newslink && data.newslink.length > 20) && <a href={data.newslink} target='_blank' rel="noopener noreferrer">
                                                            <ReactTinyLink
                                                                cardSize="small"
                                                                showGraphic={true}
                                                                maxLine={2}
                                                                minLine={1}
                                                                url={data.newslink}
                                                                loadSecureUrl={true}
                                                            /></a>}
                                                    </td>}
                                                    {data.type === 4 && <td>
                                                        <div className="post-video-area">
                                                            <iframe title={data.id} className='post-video' src={`https://www.youtube.com/embed/${getVideoLink(data.video)}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                        </div>
                                                    </td>}
                                                    {data.type === 5 && <td>{data.image && <img src={API_URL + data.image} alt='Pic' width='100' />}</td>}
                                                    <td>{getStatus(data.status)}</td>
                                                    <td>{data.likes.length}</td>
                                                    <td>{data.comments.length}</td>
                                                    <td>{getDateTime(data.created_at)}</td>
                                                </tr>
                                                {data.description && <tr><td colSpan="10">{renderHTML(data.description)}</td></tr>}
                                                {data.reject_note && <tr>
                                                    <td className='text-danger'>Reject Note:</td>
                                                    <td>{data.moderator.name}</td>
                                                    <td colSpan="10">{data.reject_note}</td>
                                                </tr>}
                                            </tbody>}
                                    </table>


                                    <div className="card-header">
                                        <h3 className="card-title"><b>List of Comments</b></h3>
                                    </div>
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Commented User</th>
                                                <th>Status</th>
                                                <th>Created At</th>
                                                <th>Comment</th>
                                                <th>Reject Note</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                            <tbody>
                                                <tr>
                                                    <td colSpan="10">
                                                        <Loading />
                                                    </td>
                                                </tr> </tbody> : data.comments.length > 0 && data.comments.map(item => <tbody key={item.id}> <tr>
                                                    <td>
                                                        {Number(item.status) === 0 &&
                                                            <span>
                                                                <a href="#blank" className="btn btn-success btn-sm" onClick={() => window.confirm('Are you sure?') && this.commentApproveHandler(item.id)}>
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                                <a href="#blank" className="btn btn-danger btn-sm" onClick={() => window.confirm('Are you sure?') && this.setState({ isCommentOpen: true, commentId: item.id })}>
                                                                    <i className="fa fa-times"></i>
                                                                </a>
                                                            </span>}
                                                    </td>
                                                    <td>{item.user.name}</td>
                                                    <td>{getStatus(item.status)}</td>
                                                    <td>{getDateTime(item.created_at)}</td>
                                                    <td>{item.comment}</td>
                                                    <td>{item.reject_note}</td>
                                                </tr>
                                                </tbody>)}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {isOpen && <PostReject
                    isOpen={isOpen}
                    closeHandler={() => this.setState({ isOpen: false, dataId: '' })}
                    actionIsDone={this.actionIsDone.bind(this)}
                    dataId={dataId}
                />}

                {isCommentOpen && <PostCommentReject
                    isOpen={isCommentOpen}
                    closeHandler={() => this.setState({ isCommentOpen: false, commentId: '' })}
                    actionIsDone={this.actionIsDone.bind(this)}
                    dataId={commentId}
                />}
            </Fragment>
        )
    }
}
export default connect(null, { approveData, rejectData, getPostDetail, approveComment })(PostDetail)