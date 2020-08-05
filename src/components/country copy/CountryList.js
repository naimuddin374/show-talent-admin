import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
import { deleteData } from '../../store/actions/countryActions';



class CountryList extends Component {
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
        Axios.get(`${API_URL}api/country`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.error(error.response))
    }
    deleteHandler = id => {
        this.props.deleteData(id)
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
                                    <h3 className="card-title">List of Country</h3>

                                    <Link className="btn btn-dark btn-sm float-right" to='/country/edit'><i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Name</th>
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
                                                            <Link className="btn btn-dark btn-sm mx-2" to={`/country/edit/${item.id}/${item.name}`}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            <a href="#blank" className="btn btn-danger btn-sm" onClick={() => this.deleteHandler(item.id)}>
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                        <td>{item.name}</td>
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
export default connect(null, { deleteData })(CountryList)