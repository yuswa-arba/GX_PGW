import crypto from 'crypto';

export const STORAGE_ACCESS_TOKEN = "Portal_accessToken"
export const STORAGE_USER_ACCOUNT = "Portal_userAccount"


export const getAccessToken = window.localStorage.getItem(STORAGE_ACCESS_TOKEN)
export const saveAccessToken = (token) => {
    return window.localStorage.setItem(STORAGE_ACCESS_TOKEN, token)
}
export const removeAccessToken = () => {
    return window.localStorage.removeItem(STORAGE_ACCESS_TOKEN)
}

export const getUserAccount = JSON.parse(window.localStorage.getItem(STORAGE_USER_ACCOUNT))
export const saveUserAccount = (user) => {
    return window.localStorage.setItem(STORAGE_USER_ACCOUNT, JSON.stringify(user))
}
export const removeUserAccount = () => {
    return window.localStorage.removeItem(STORAGE_USER_ACCOUNT)
}


export const encryptCode = () => {

    const TOKEN_SECRET = process.env.REACT_APP_SECRET + ':' + Date.now()

    let cipher = crypto.createCipheriv('aes-256-cbc', process.env.REACT_APP_ENCRYPTION_KEY, process.env.REACT_APP_ENCRYPTION_IV);
    let encrypted = cipher.update(TOKEN_SECRET, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted

}
