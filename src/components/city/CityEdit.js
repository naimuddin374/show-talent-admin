import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { storeData, updateData, getCityDetail } from '../../store/actions/cityActions'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCountry } from '../../store/actions/countryActions';


class CityEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWait: false,
            id: props.match.params.id || null,
            country_id: 0,
            name: '',
            status: 1,
            countries: []
        }
    }
    async componentDidMount() {
        let { id } = this.state
        if (id) {
            this.setState({
                ...await this.props.getCityDetail(id),
            })
        }
        this.fetchCountry()
    }
    fetchCountry = async () => {
        this.setState({
            countries: await this.props.getAllCountry()
        })
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = async event => {
        event.preventDefault()
        this.setState({ isWait: true })
        let { id } = this.state
        let response = id ? await this.props.updateData(this.state, id) : await this.props.storeData(this.state)
        response && this.props.history.push('/city/list')
        this.setState({ isWait: false })
    }
    render() {
        let { name, country_id, countries, isWait } = this.state
        let isDone = country_id && name && !isWait
        return (
            <Fragment>
                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="card-header">
                                    <Link className="btn btn-dark btn-sm float-right" to='/country/list'><i className="fa fa-eye"></i></Link>
                                </div>

                                <div className="card-body">
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
                                            <Form.Label>Name<span>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Name"
                                                name="name"
                                                value={name}
                                                onChange={this.changeHandler}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Country<span>*</span></Form.Label>
                                            <Form.Control
                                                as='select'
                                                className="form-control"
                                                name="country_id"
                                                value={country_id}
                                                onChange={this.changeHandler}
                                                required
                                            >
                                                <option value=''>Select One</option>
                                                {countries.length > 0 && countries.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" block variant="dark" disabled={!isDone}>{isWait ? `Please Wait...` : `Submit`}</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    common: state.common
})
export default connect(mapStateToProps, { updateData, storeData, getCityDetail, getAllCountry })(CityEdit)