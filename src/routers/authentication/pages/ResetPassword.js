import React, {Component} from "react";
import {Link} from "react-router-dom";
import queryString from "query-string";

import LayoutAuthentication from "../../../ui/layouts/Authentication";
import {FormInput} from "../../../ui/forms/Input";
import {PrimaryButton} from "../../../ui/components/Buttons";

import {login} from "../../../lib/root";
import {authValidateResetPasswordToken, authResetPassword} from "../../../lib/authentication";

import {goToLogin} from "../../../config/movePage";

class ResetPassword extends Component {

    state = {
        formRequest: {
            token: '',
            email: '',
            password: '',
            confirmation: ''
        },
        processSuccess: true,
        resMsg: '',
        isLoading: false
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

    _handleCheckResetToken = () => {

        const formRequestState = this.state.formRequest

        const formRequest = {
            token: formRequestState.token,
            em: formRequestState.email
        }

        this._isLoading(true, true, null, (() => {
            authValidateResetPasswordToken(formRequest)
                .then((resData) => {
                    if (resData && resData.status && resData.status === 'success') {
                        this._isLoading(false, true)
                    } else {
                        const errMsg = resData.errors && resData.errors.msg ? resData.errors.msg : null
                        this._isLoading(false, false, errMsg)
                    }
                })
                .catch((err) => {
                    this._isLoading(false, false, err.message)
                })
        })())
    }

    _handleResetPassword = () => {
        this._isLoading(true, true, null, (() => {
            authResetPassword(this.state.formRequest)
                .then((resData) => {

                    if (resData && resData.status && resData.status === 'success') {
                        this._isLoading(false, true, resData.success.msg, (() => {
                            goToLogin()
                        })())
                    } else {
                        const errMsg = resData.errors && resData.errors.msg ? resData.errors.msg : null
                        this._isLoading(false, false, errMsg)
                    }

                })
                .catch((err) => {
                    this._isLoading(false, false, err.message)
                })
        })())
    }

    _isLoading = (isLoading, success = true, msg = null, callback = null) => {
        this.setState({
            isLoading: isLoading,
            processSuccess: success,
            resMsg: msg
        }, () => {
            return callback
        })
    }

    componentDidMount() {
        this.setState((prevState) => {

            const params = queryString.parse(this.props.location.search)

            let newFormRequest = prevState.formRequest
            newFormRequest.email = params.em || ''
            newFormRequest.token = params.token || ''

            return {
                formRequest: newFormRequest
            }

        }, () => {
            this._handleCheckResetToken()
        })
    }

    render() {

        const {formRequest, processSuccess, resMsg, isLoading} = this.state

        return (
            <LayoutAuthentication title="Reset Password" description="Re-Password Portal.">

                {resMsg ?
                    <div className={'alert text-center mb-4 ' + (processSuccess ? 'alert-success' : 'alert-danger')}
                         role="alert">
                        {resMsg}
                    </div> : null}

                <form className="form-horizontal">

                    <FormInput type="email"
                               name="email"
                               value={formRequest.email}
                               placeholder="Enter email"
                               label="Email"
                               change={this._handleChangeForm}/>

                    <FormInput type="password"
                               name="password"
                               value={formRequest.password}
                               placeholder="Enter password"
                               label="Password"
                               change={this._handleChangeForm}/>

                    <FormInput type="password"
                               name="confirmation"
                               value={formRequest.confirmation}
                               placeholder="Enter password confirmation"
                               label="Password Confirmation"
                               change={this._handleChangeForm}/>

                    <div className="form-group row mb-0">
                        <div className="col-12 text-right">
                            <PrimaryButton title="Reset"
                                           isLoaded={isLoading}
                                           click={() => this._handleResetPassword()}/>
                        </div>
                    </div>

                </form>

                <div className="mt-4 text-center">
                    <p>Remember It ?
                        <Link to={login} className="font-weight-medium text-primary"> Sign In here</Link>
                    </p>
                </div>

            </LayoutAuthentication>
        );
    }

}

export default ResetPassword;