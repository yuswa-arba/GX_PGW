import {format} from "date-fns";
import {call_get, download_file, shape_api_then} from "./api";
import {
    crmTransactionAll,
    crmTransactionAllDownload,
    crmTransactionAlterra,
    crmTransactionAlterraDownload,
    crmTransactionDana,
    crmTransactionDanaDownload,
    crmTransactionGopay,
    crmTransactionGopayDownload,
    crmTransactionMidtrans,
    crmTransactionMidtransDownload
} from "./root";

export function getAllTransactions(params) {
    return shape_api_then(call_get(crmTransactionAll, params))
}

export function downloadAllTransactions(params) {
    const filename = 'all_transactions-' + format(new Date(), 'dd-MM-yyyy') + '.xlsx'
    return shape_api_then(download_file(crmTransactionAllDownload, params, filename))
}

export function getAlterraTransactions(params) {
    return shape_api_then(call_get(crmTransactionAlterra, params))
}

export function downloadAlterraTransactions(params) {
    const filename = 'alterra_transactions-' + format(new Date(), 'dd-MM-yyyy') + '.xlsx'
    return shape_api_then(download_file(crmTransactionAlterraDownload, params, filename))
}

export function getDanaTransactions(params) {
    return shape_api_then(call_get(crmTransactionDana, params))
}

export function downloadDanaTransactions(params) {
    const filename = 'dana_transactions-' + format(new Date(), 'dd-MM-yyyy') + '.xlsx'
    return shape_api_then(download_file(crmTransactionDanaDownload, params, filename))
}

export function getGopayTransactions(params) {
    return shape_api_then(call_get(crmTransactionGopay, params))
}

export function downloadGopayTransactions(params) {
    const filename = 'gopay_go_tagihan_transactions-' + format(new Date(), 'dd-MM-yyyy') + '.xlsx'
    return shape_api_then(download_file(crmTransactionGopayDownload, params, filename))
}

export function getMidtransTransactions(params) {
    return shape_api_then(call_get(crmTransactionMidtrans, params))
}

export function downloadMidtransTransactions(params) {
    const filename = 'midtrans_transactions-' + format(new Date(), 'dd-MM-yyyy') + '.xlsx'
    return shape_api_then(download_file(crmTransactionMidtransDownload, params, filename))
}
