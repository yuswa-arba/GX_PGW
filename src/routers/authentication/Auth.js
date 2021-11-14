import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Pages
import Login from './pages/login/Login';
import ForgotPassword from './pages/password/ForgotPassword';
import ResetPassword from './pages/password/ResetPassword';

class Auth extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route path='/email' component={ForgotPassword}/>
                    <Route path='/email/reset' component={ResetPassword}/>
                </Switch>
            </BrowserRouter>
        );

    }

}

export default Auth;
