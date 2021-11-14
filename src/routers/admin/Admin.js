import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import * as root from '../../lib/root'

// Pages
import All from './pages/All';
import Alterra from './pages/Alterra';
import Dana from './pages/Dana';

// SCSS
import 'select2/dist/css/select2.min.css'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css'
import '../../assets/scss/bootstrap.scss'
import '../../assets/scss/icons.scss'
import '../../assets/scss/app.scss'

// JS
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'simplebar/dist/simplebar.min'
import 'node-waves/dist/waves.min'
import 'select2/dist/js/select2.min'
import 'bootstrap-datepicker'

class Admin extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={root.all} component={All}/>
                    <Route path={root.alterra} component={Alterra}/>
                    <Route path={root.dana} component={Dana}/>
                </Switch>
            </BrowserRouter>
        );

    }

}

export default Admin;
