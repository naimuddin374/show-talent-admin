import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { getStatus, getDateTime } from '../../util/helper';
import { getAllBook } from '../../store/actions/ebookActions';
import { API_URL } from '../../store/actions/types';


class EbookContent extends Component {
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
        this.setState({
            loading: false,
            data: await this.props.getAllBook()
        })
    }
    approveHandler = async id => {
        let { approveData } = this.props
        await approveData(id)
        this.onFetchData()
    }
    rejectHandler = async id => {
        let { rejectData } = this.props
        await rejectData(id)
        this.onFetchData()
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
                                                </tr> : Object.keys(data).length !== 0 && data.map(item =>
                                                    <tr key={item.id}>
                                                        <td>
                                                            {Number(item.status) === 0 &&
                                                                <span>
                                                                    <a href="#blank" className="btn btn-success btn-sm" onClick={() => this.approveHandler(item.id)}>
                                                                        <i className="fa fa-check"></i>
                                                                    </a>
                                                                    <Link className="btn btn-dark btn-sm my-2" to={`/ebook/edit/${item.id}/${item.name}`}>
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <Link className="btn btn-dark btn-sm my-2" to={`/ebook/detail/${item.id}/${item.name}`}>
                                                                        <i className="fa fa-eye"></i>
                                                                    </Link>
                                                                    <a href="#blank" className="btn btn-danger btn-sm" onClick={() => this.rejectHandler(item.id)}>
                                                                        <i className="fa fa-times"></i>
                                                                    </a>
                                                                </span>}
                                                        </td>
                                                        <td>{item.page ? item.page.name : item.user.name}</td>
                                                        <td>{item.category.name}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.author_name}</td>
                                                        <td>{item.publication_date}</td>
                                                        <td>{item.preface}</td>
                                                        <td>{item.summary}</td>
                                                        <td>{item.author_summary}</td>
                                                        <td>
                                                            <Link to={`/ebook/detail/${item.id}/${item.name}`}>
                                                                {item.chapter.length}
                                                            </Link>
                                                        </td>
                                                        <td>{getStatus(item.status)}</td>
                                                        <td>{getDateTime(item.created_at)}</td>
                                                        <td>{item.front_image && <img src={API_URL + item.front_image} width='100' />}</td>
                                                        <td>{item.back_image && <img src={API_URL + item.back_image} width='100' />}</td>
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
export default connect(null, { getAllBook })(EbookContent)