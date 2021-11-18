import {call_post, shape_api_then} from "./api";
import {
    crmForgotPassword,
    crmLogin,
    crmLogout,
    crmResetPassword,
    crmResetPasswordValidateToken,
    crmUserDetail
} from "./root";
import * as notify from "./notification"

import {
    removeAccessToken,
    removeUserAccount,
    saveAccessToken,
    saveUserAccount
} from "../config/authentication";
import {goToLogin} from "../config/movePage";

export const authLogin = (data) => {
    return shape_api_then(call_post(crmLogin, data), true)
        .then(async (resData) => {

            if (resData.results && resData.results.token && resData.results.token.accessToken) {
                await saveAccessToken(resData.results.token.accessToken)
            }

            return resData

        }).catch((err) => {
            console.log(err)
            notify.error(err.message)
        })
}

export const getUserDetail = () => {
    return shape_api_then(call_post(crmUserDetail), true)
        .then((resData) => {

            if (resData.results && resData.results.user) {
                saveUserAccount(resData.results.user)
            }

            return resData
        })
        .catch((err) => {
            console.log(err)
            notify.error(err.message)
        })
}

export const authLogout = () => {
    return shape_api_then(call_post(crmLogout), true)
        .then(async (resData) => {
            if (resData.status === 'success') {
                await removeAccessToken()
                await removeUserAccount()
                await goToLogin()
            }
            return resData
        })
        .catch((err) => {
            console.log(err)
            notify.error(err.message)
        })
}

export const authForgotPassword = (data) => {
    return shape_api_then(call_post(crmForgotPassword, data), true)
}

export const authValidateResetPasswordToken = (data) => {
    return shape_api_then(call_post(crmResetPasswordValidateToken, data), true)
}

export const authResetPassword = (data) => {
    return shape_api_then(call_post(crmResetPassword, data), true)
}
