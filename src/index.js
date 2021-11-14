import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from "./ui/ErrorBoundary";
import Admin from "./routers/admin/Admin";
import Auth from "./routers/authentication/Auth";

// SCSS
import './assets/scss/bootstrap.scss'
import './assets/scss/icons.scss'
import './assets/scss/app.scss'

// JS
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'simplebar/dist/simplebar.min'
import 'node-waves/dist/waves.min'

class App extends Component {

    render() {


        return (
            <ErrorBoundary>
                <Admin/>
                <Auth/>
            </ErrorBoundary>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
