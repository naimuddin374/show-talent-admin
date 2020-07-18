import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './../layout/Loading';
import { getAllUsers } from '../../store/actions/userActions';
import { API_URL } from '../../store/actions/types';
import noImg from '../assets/images/no-img.jpg';

class User extends Component {
    state = {
        data: [],
        loading: true,
        postStatus: null
    }
    componentDidMount() {
        this.onFetchData()
    }
    onFetchData = async () => {
        this.setState({
            data: await this.props.getAllUsers(),
            loading: false
        })
    }
    render() {
        let { data, loading, postStatus } = this.state

        if (postStatus != null) {
            if (postStatus === 11) {
                data = data.filter(item => Number(item.type) === 1)
            } else if (postStatus === 12) {
                data = data.filter(item => Number(item.type) === 2)
            } else if (postStatus === 13) {
                data = data.filter(item => Number(item.type) === 3)
            } else {
                data = data.filter(item => Number(item.status) === postStatus)
            }
        }
        return (
            <Fragment>
                <section className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">List of Users & Moderator</h3>

                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 0 })}>Pending</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 1 })}>Active</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 2 })}>Blocked</button>

                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 11 })}>User</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 12 })}>Moderator</button>
                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: 13 })}>Admin</button>

                                    <button className='btn btn-dark mx-2 btn-sm' onClick={() => this.setState({ postStatus: null })}>Reset</button>

                                    <Link className="btn btn-dark btn-sm float-right" to='/users/create'><i className="fa fa-plus"></i></Link>
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
                                                            <Link className="btn btn-dark btn-sm" to={`/users/create/${item.id}/${item.name}`}><i className="fa fa-edit"></i></Link>
                                                        </td>
                                                        <td><img src={item.image ? API_URL + item.image : noImg} alt='Profile' width='100' /></td>
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
export default connect(null, { getAllUsers })(User)