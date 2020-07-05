import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './auth/Login';


class AuthRoutes extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/' exact component={Login} history={this.props.history} />
                </Switch>
            </React.Fragment>
        )
    }
}
export default AuthRoutes