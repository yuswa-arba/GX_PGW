import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import * as root from "../../lib/root";

// Pages
import All from "./pages/All";
import Alterra from "./pages/Alterra";
import Dana from "./pages/Dana";
import GopayGoTagihan from "./pages/GopayGoTagihan";
import Midtrans from "./pages/Midtrans";

// SCSS
import "select2/dist/css/select2.min.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css";

// JS
import "select2/dist/js/select2.min";
import "bootstrap-datepicker";

class Admin extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={root.all} component={All}/>
                    <Route exact path={root.alterra} component={Alterra}/>
                    <Route exact path={root.dana} component={Dana}/>
                    <Route exact path={root.gopayGoTagihan} component={GopayGoTagihan}/>
                    <Route exact path={root.midtrans} component={Midtrans}/>
                </Switch>
            </BrowserRouter>
        );

    }

}

export default Admin;
