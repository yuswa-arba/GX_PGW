export const END_POINT = '/'
export const BASE_URL_CRM = process.env.REACT_APP_CRM_BASE_URL + 'pgw/portal/api/v1/';


/*
 |--------------------------------------------------------------------------
 |  WEB PORTAL ROUTE
 |--------------------------------------------------------------------------
 */

export const all = END_POINT
export const alterra = END_POINT + 'alterra'
export const dana = END_POINT + 'dana'
export const gopayGoTagihan = END_POINT + 'gopay'
export const midtrans = END_POINT + 'midtrans'

export const login = END_POINT + 'login'
export const forgotPassword = END_POINT + 'email'
export const resetPassword = END_POINT + 'reset'


/*
 |--------------------------------------------------------------------------
 |  CRM PORTAL API ROUTE
 |--------------------------------------------------------------------------
 */

// Authentication
export const crmAuthentication = BASE_URL_CRM + 'auth/'
export const crmLogin = crmAuthentication + 'login'
export const crmLogout = crmAuthentication + 'logout'
export const crmUserDetail = crmAuthentication + 'user'
export const crmForgotPassword = crmAuthentication + 'email'
export const crmResetPasswordValidateToken = crmAuthentication + 'reset/token'
export const crmResetPassword = crmAuthentication + 'reset'

// Transactions
export const crmTransaction = BASE_URL_CRM + 'transactions/'
export const crmTransactionAll = crmTransaction + 'all'
export const crmTransactionAllDownload = crmTransactionAll + '/download'
export const crmTransactionAlterra = crmTransaction + 'alterra'
export const crmTransactionAlterraDownload = crmTransactionAlterra + '/download'
export const crmTransactionDana = crmTransaction + 'dana'
export const crmTransactionDanaDownload = crmTransactionDana + '/download'
export const crmTransactionGopay = crmTransaction + 'gopay'
export const crmTransactionGopayDownload = crmTransactionGopay + '/download'
export const crmTransactionMidtrans = crmTransaction + 'midtrans'
export const crmTransactionMidtransDownload = crmTransactionMidtrans + '/download'

// Component
export const crmPartners = BASE_URL_CRM + 'partners'


