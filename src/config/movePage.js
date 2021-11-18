import * as root from "../lib/root";

// Admin
export const goToAllTransaction = () => {window.location.href = root.all}
export const goToAlterraTransaction = () => {window.location.href = root.alterra}
export const goToDanaTransaction = () => {window.location.href = root.dana}
export const goToGopayTransaction = () => {window.location.href = root.gopayGoTagihan}
export const goToMidtransTransaction = () => {window.location.href = root.midtrans}

// Authentication
export const goToLogin = () => {window.location.href = root.login}
export const goToForgotPassword = () => {window.location.href = root.forgotPassword}
export const goToResetPassword = () => {window.location.href = root.resetPassword}