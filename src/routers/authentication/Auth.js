import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import * as root from "../../lib/root"

// Pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import {encryptCode} from "../../config/authentication";

class Auth extends Component {

    render() {
        console.log(encryptCode())

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={root.login} component={Login}/>
                    <Route exact path={root.forgotPassword} component={ForgotPassword}/>
                    <Route exact path={root.resetPassword} component={ResetPassword}/>
                </Switch>
            </BrowserRouter>
        );

    }

}

export default Auth;
