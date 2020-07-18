import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import { approveData, rejectData, getAllPost, postUnpublished, deletePost } from '../../store/actions/postActions';
import { getStatus, getVideoLink, getDateTime } from '../../util/helper';
import { ReactTinyLink } from 'react-tiny-link'
import { API_URL } from '../../store/actions/types';
import PostReject from './PostReject';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap';


class Post extends Component {
    state = {
        data: [],
        loading: true,
        type: Number(this.props.match.params.type),
        isOpen: false,
        dataId: '',
        postStatus: null,
        createdBy: null
    }
    componentWillReceiveProps(props) {
        let { type } = props.match.params
        type = Number(type)
        if (type !== this.state.type) {
            this.onFetchData(type)
        }
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async (type = this.state.type) => {
        this.setState({
            loading: true,
            data: [],
            type
        })
        let response = await this.props.getAllPost()
        this.setState({
            data: response.length > 0 ? response.filter(item => item.type === type) : [],
            loading: false
        })
    }
    approveHandler = async id => {
        await this.props.approveData(id)
        this.onFetchData()
    }
    removeHandler = async id => {
        await this.props.deletePost(id)
        this.onFetchData()
    }
    unpublishedHandler = async id => {
        await this.props.postUnpublished(id)
        this.onFetchData()
    }
    actionIsDone = () => {
        this.setState({
            isOpen: false,
            dataId: '',
        })
        this.onFetchData()
    }
    render() {
        let { data, loading, type, dataId, isOpen, postStatus, createdBy } = this.state

        if (postStatus != null) {
            data = data.filter(item => Number(item.status) === postStatus)
        } else {
            if (createdBy === 'user') {
                data = data.filter(item => item.page === null)
            } else if (createdBy === 'page') {
                data = data.filter(item => item.page !== null)
            }
        }

        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of {(type === 2 && 'News link') || (type === 3 && 'Opinion') || (type === 4 && 'Video') || (type === 5 && 'Image') || (type === 6 && 'Content')}</h3>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: null, createdBy: null })}>All</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ createdBy: 'user' })}>User Created</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ createdBy: 'page' })}>Page Created</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 0 })}>Pending</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 1 })}>Approved</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 2 })}>Rejected</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 3 })}>Unpublished</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 3 })}>Unpublished</button>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                {type === 2 && <th>News Link</th>}
                                                {type === 4 && <th>Video</th>}
                                                {type === 5 && <th>Image</th>}
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
                                                </tr></tbody> : data.length > 0 && data.map(item =>
                                                    <tbody key={item.id}>
                                                        <tr>
                                                            <td>
                                                                <DropdownButton id="dropdown-basic-button" title="Action">
                                                                    <Dropdown.Item href={`/posts/detail/${item.id}/${item.title}`}>Detail</Dropdown.Item>
                                                                    <Dropdown.Item href={`/posts/edit/${item.id}/${item.title}`}>Edit</Dropdown.Item>
                                                                    {item.status !== 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.approveHandler(item.id)}>Approve</Dropdown.Item>}
                                                                    {item.status === 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.unpublishedHandler(item.id)}>Unpublished</Dropdown.Item>}
                                                                    {item.status === 0 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.setState({ isOpen: true, dataId: item.id })}>Reject</Dropdown.Item>}
                                                                    <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.removeHandler(item.id)}>Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                            <td>{item.page ? item.page.name : item.user.name}</td>
                                                            <td>{item.category.name}</td>
                                                            <td>{item.title}</td>
                                                            {item.type === 2 && <td>
                                                                {(item.newslink && item.newslink.length > 20) && <a href={item.newslink} target='_blank' rel="noopener noreferrer">
                                                                    <ReactTinyLink
                                                                        cardSize="small"
                                                                        showGraphic={true}
                                                                        maxLine={2}
                                                                        minLine={1}
                                                                        url={item.newslink}
                                                                        loadSecureUrl={true}
                                                                    /></a>}
                                                            </td>}
                                                            {item.type === 4 && <td>
                                                                <div className="post-video-area">
                                                                    <iframe title={item.id} className='post-video' src={`https://www.youtube.com/embed/${getVideoLink(item.video)}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                                </div>
                                                            </td>}
                                                            {item.type === 5 && <td>{item.image && <img src={API_URL + item.image} alt='Pic' width='100' />}</td>}
                                                            <td>{getStatus(item.status)}</td>
                                                            <td>{getDateTime(item.created_at)}</td>
                                                        </tr>
                                                        {/* {item.description && <tr><td colSpan="10">{renderHTML(item.description)}</td></tr>} */}
                                                        {/* {item.reject_note && <tr>
                                                            <td className='text-danger'>Reject Note:</td>
                                                            <td>{item.moderator.name}</td>
                                                            <td colSpan="10">{item.reject_note}</td>
                                                        </tr>} */}
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
            </Fragment>
        )
    }
}
export default connect(null, { approveData, rejectData, getAllPost, postUnpublished, deletePost })(Post)