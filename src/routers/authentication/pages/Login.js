import React, {Component} from "react";
import {Link} from "react-router-dom";

import LayoutAuthentication from "../../../ui/layouts/Authentication";
import {FormInput} from "../../../ui/forms/Input";
import {PrimaryButton} from "../../../ui/components/Buttons";

import {forgotPassword} from "../../../lib/root"
import {getUserDetail, authLogin} from "../../../lib/authentication";
import {goToAllTransaction} from "../../../config/movePage";

class Login extends Component {

    state = {
        formRequest: {
            email: '',
            password: ''
        },
        isLoading: false,
        errMsg: null,
    }

    _handleChangeForm = (event) => {

        let target = event.target
        let name = target.name
        let value = target.value

        this.setState((prevState) => {

            let newFormRequest = prevState.formRequest
            newFormRequest[name] = value

            return {
                formRequest: newFormRequest
            }

        })

    }

    _handleLogin = () => {
        this._isLoading(true, null, (() => {
            authLogin(this.state.formRequest)
                .then((resData) => {

                    if (resData.results && resData.results.token && resData.results.token.accessToken) {
                        this._handleGetUserDetail()
                    } else {
                        const errMsg = resData.errors && resData.errors.msg ? resData.errors.msg : null
                        this._isLoading(false, errMsg)
                    }

                })
                .catch((err) => {
                    this._isLoading(false, err.message)
                })
        })())

    }

    _handleGetUserDetail = () => {
        getUserDetail()
            .then((resData) => {
                if (resData && resData.results && resData.results.user) {
                    goToAllTransaction()
                } else {
                    const errMsg = resData.errors && resData.errors.msg ? resData.errors.msg : null
                    this._isLoading(false, errMsg)
                }
            })
            .catch((err) => {
                this._isLoading(false, err.message)
            })
    }

    _isLoading = (isLoading, errMsg, callback = null) => {
        this.setState({
            isLoading: isLoading,
            errMsg: errMsg
        }, () => {
            return callback
        })
    }

    render() {

        const {isLoading, errMsg} = this.state

        return (
            <LayoutAuthentication title="Welcome Back !" description="Sign in to continue to Portal.">

                {errMsg ?
                    <div className="alert alert-danger text-center mb-4" role="alert">
                        {errMsg}
                    </div> : null}


                <form className="form-horizontal">

                    <FormInput type="email" name="email"
                               placeholder="Enter email"
                               label="E-Mail"
                               change={this._handleChangeForm}/>

                    <FormInput type="password"
                               name="password"
                               placeholder="Enter password"
                               label="Password"
                               change={this._handleChangeForm}/>

                    <div className="mt-3">
                        <PrimaryButton title="Log In"
                                       btnClass="btn-block"
                                       isLoaded={isLoading}
                                       click={() => this._handleLogin()}/>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to={forgotPassword} className="text-muted">
                            <i className="mdi mdi-lock mr-1"/> Forgot your password?</Link>
                    </div>

                </form>

            </LayoutAuthentication>
        );
    }

}

export default Login;