import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'
import { API_URL } from '../../store/actions/types'
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';


class User extends Component {
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
        Axios.get(`${API_URL}api/admin/user`)
            .then(res => {
                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(error => console.log(error.response))
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
                                    <h3 className="card-title">List of Users</h3>
                                    <Link className="btn btn-dark btn-sm float-right" to='/users/edit'><i className="fa fa-plus"></i></Link>
                                </div>
                                <div className="card-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Image</th>
                                                <th>Full Name</th>
                                                <th>Display Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Type</th>
                                                <th>Status</th>
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
                                                            <Link className="btn btn-dark btn-sm" to={`/users/edit/${item.id}`}><i className="fa fa-edit"></i></Link>
                                                        </td>
                                                        <td>{item.image}</td>
                                                        <td>{item.full_name}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.contact}</td>
                                                        <td>{(Number(item.type) === 1 && "User") || (Number(item.type) === 2 && "Moderator") || (Number(item.type) === 3 && "Admin")}</td>
                                                        <td>{(Number(item.status) === 0 && "Pending") || (Number(item.status) === 1 && "Active") || (Number(item.status) === 2 && "Blocked")}</td>
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
export default connect(null)(User)