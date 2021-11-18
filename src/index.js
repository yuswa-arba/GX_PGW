import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash"

import ErrorBoundary from "./ui/ErrorBoundary";
import Admin from "./routers/admin/Admin";
import Auth from "./routers/authentication/Auth";

import {menus} from "./config/sidebarsMenu";
import * as partners from "./config/partners";
import {getUserAccount} from "./config/authentication";
import {
    goToAlterraTransaction,
    goToDanaTransaction,
    goToGopayTransaction,
    goToLogin,
    goToMidtransTransaction
} from "./config/movePage";

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

    state = {
        userAccount: {}
    }

    _handleCheckPartnerType = () => {

        const pathname = window.location.pathname
        const adminRoots = menus.map((menu) => {
            return menu.root
        })

        const userAccount = this.state.userAccount
        if (_.isEmpty(userAccount) && adminRoots.includes(pathname)) {
            goToLogin()
        }

        if (!_.isEmpty(userAccount) && !adminRoots.includes(pathname)) {
            window.history.back()
        }

        if (adminRoots.includes(pathname) && (userAccount.partner !== partners.ADMINISTRATOR)) {

            const menu = menus.find((menu) => {
                return menu.partner === userAccount.partner
            })

            if (pathname !== menu.root) {

                if (userAccount.partner === partners.ALTERRA) {
                    goToAlterraTransaction()
                }

                if (userAccount.partner === partners.DANA) {
                    goToDanaTransaction()
                }

                if (userAccount.partner === partners.GOPAY_GO_TAGIHAN) {
                    goToGopayTransaction()
                }

                if (userAccount.partner === partners.MIDTRANS) {
                    goToMidtransTransaction()
                }

            }

        }

    }

    componentDidMount() {
        this.setState(() => {
            return {
                userAccount: getUserAccount || {}
            }
        }, () => {
            this._handleCheckPartnerType()
        })
    }

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
