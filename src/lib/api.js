import axios from "axios";
import * as notify from "./notification";
import {encryptCode, STORAGE_ACCESS_TOKEN} from "../config/authentication";

export const configHeaderBody = () => {

    const accessToken = window.localStorage.getItem(STORAGE_ACCESS_TOKEN)||''
    return {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        'Secret': encryptCode()
    }

}

export async function get(url, params, others, headers = {}) {
    return await axios({
        method: 'get',
        url: url,
        params: params,
        headers: {
            ...headers
        },
        ...others
    })
}

export async function post(url, data, other, headers = {}) {
    return await axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
            ...headers
        },
        withCredentials: false,
        ...other
    })
}

export function call_post(url, data = {}, others = {}) {
    return post(url, data, others, configHeaderBody())
}

export function call_get(url, params, others = {}) {
    return get(url, params, others, configHeaderBody())
}

export function download_file(url, params = {}, filename = 'transaction.xlsx') {

    let others = {responseType: 'blob'}

    return get(url, params, others, configHeaderBody())
        .then((res) => {

            if (res.data) {

                const url = window.URL.createObjectURL(new Blob([res.data]))

                const tagA = document.createElement('a');
                tagA.href = url
                tagA.download = filename
                tagA.click();

                window.URL.revokeObjectURL(url);

            }

            return res.data

        })
        .catch((err) => {
            notify.error(err.message)
        })
}

export function shape_api_then(funcUrl, isUsingNotification = true) {
    return funcUrl
        .then((res) => {

            if (isUsingNotification) {
                if (res.data && res.data.status && (res.data.status === 'error')) {
                    notify.error(res.data.errors.msg)
                }
            }

            return res.data

        }).catch((err) => {
            notify.error(err.message)
            console.log(err)
        })
}
