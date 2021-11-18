import toastr from 'toastr'
import "toastr/toastr.scss"

export function success(message, timeout = 3500) {
    toastr.options.timeOut = timeout
    toastr.success(message)
}

export function info(message, timeout = 3500) {
    toastr.options.timeOut = timeout
    toastr.info(message)
}

export function error(message, timeout = 3500) {
    toastr.options.timeOut = timeout
    toastr.error(message)
}

export function warning(message, timeout = 3500) {
    toastr.options.timeOut = timeout
    toastr.warning(message)
}
