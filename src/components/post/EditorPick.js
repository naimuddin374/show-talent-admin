import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Loading from './../layout/Loading';
import { updateEditorPick, getAllPost } from '../../store/actions/postActions';
import { getStatus, getVideoLink, getDateTime } from '../../util/helper';
import { ReactTinyLink } from 'react-tiny-link'
import { API_URL } from '../../store/actions/types';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap';
import renderHTML from 'react-render-html';


class EditorPick extends Component {
    state = {
        data: [],
        loading: true,
        postStatus: null,
        createdBy: null,
        isEditor: 1
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
        this.setState({
            data: response,
            loading: false
        })
    }
    editorPickHandler = async (id, is_editor) => {
        await this.props.updateEditorPick(id, { is_editor })
        this.onFetchData()
    }
    render() {
        let { data, loading, postStatus, createdBy, isEditor } = this.state

        if (postStatus != null) {
            data = data.filter(item => Number(item.status) === postStatus)
        } else {
            if (isEditor === 1) {
                data = data.filter(item => item.is_editor === 1)
            } else if (createdBy === 'user') {
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
                                    <h3 className="card-title">List of Editors</h3>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: null, createdBy: null, isEditor: null })}>All</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ isEditor: 1 })}>Editor</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ createdBy: 'user' })}>User Created</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ createdBy: 'page' })}>Page Created</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 0 })}>Pending</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 1 })}>Approved</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 2 })}>Rejected</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 3 })}>Unpublished</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 3 })}>Unpublished</button>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Creator</th>
                                                <th>Category</th>
                                                <th>Title</th>
                                                <th>News/Video/Image</th>
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
                                                                    {item.is_editor === 0 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.editorPickHandler(item.id, 1)}>Add Editor</Dropdown.Item>}
                                                                    {item.is_editor === 1 && <Dropdown.Item href='#' onClick={() => window.confirm('Are you sure?') && this.editorPickHandler(item.id, 0)}>Remove Editor</Dropdown.Item>}
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
                                                            {item.type === 3 && <td>{item.description && renderHTML(item.description.slice(0, 180))}</td>}
                                                            <td>{getStatus(item.status)}</td>
                                                            <td>{getDateTime(item.created_at)}</td>
                                                        </tr>
                                                    </tbody>)}
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
export default connect(null, { getAllPost, updateEditorPick })(EditorPick)