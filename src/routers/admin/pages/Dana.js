import React, {Component} from "react";

import LayoutAdmin from "../../../ui/layouts/Admin";
import {FormInput} from "../../../ui/forms/Input";
import {FormSelect} from "../../../ui/forms/Select";
import {PrimaryButton} from "../../../ui/components/Buttons";
import {Loading, NotAvailable} from "../../../ui/Processing";
import DateRange from "../../../ui/forms/DateRange";
import PaginationRow from "../../../ui/components/PaginationRow";

import * as notify from "../../../lib/notification";
import {downloadDanaTransactions, getDanaTransactions} from "../../../lib/transaction";
import {getPartners} from "../../../lib/partners";

import {DANA} from "../../../config/partners";

class Dana extends Component {

    state = {
        transactions: [],
        statuses: [],
        isFirstOpened: true,
        searchObject: {
            v: '',
            status: '',
            fromDate: '',
            toDate: '',
            page: 1
        },
        pagination: {},
        isLoading: true,
        isLoadingDownload: false
    }

    _handleChangeFilter = (event) => {

        let target = event.target;
        let value = target.value;
        let name = target.name

        this.setState((prevState) => {

            let newStatuses = prevState.statuses
            let newSearchObject = prevState.searchObject

            newSearchObject[name] = value

            return {
                searchObject: newSearchObject,
                statuses: newStatuses
            }

        })

    }

    _handleGetPartners = () => {
        getPartners()
            .then((resData) => {

                let alterraPartnerStatus = {}

                this.setState(() => {

                    if (resData && resData.results && resData.results.partners) {
                        alterraPartnerStatus = resData.results.partners.find((partner) => {
                            return partner.key === DANA
                        })
                    }

                    return {
                        statuses: alterraPartnerStatus.attributes ?
                            alterraPartnerStatus.attributes.map((attribute) => {
                                return {
                                    code: attribute.code,
                                    name: attribute.message
                                }
                            }) : []
                    }

                })

            })
            .catch((err) => {
                notify.error(err.message)
            })
    }

    _handleSearchEnter = (event) => {
        if (event.key === 'Enter') {
            this._handleMovePage()
        }
    }

    _handleMovePage = (page = 1) => {
        this.setState((prevState) => {
            let newSearchObject = prevState.searchObject
            newSearchObject.page = page

            return {
                searchObject: newSearchObject,
                isLoading: true
            }

        }, () => {
            this._handleGetData()
        })
    }

    _handleGetData = () => {
        getDanaTransactions(this.state.searchObject)
            .then((resData) => {

                let transactions = []
                let pagination = {}

                this.setState(() => {

                    if (resData && resData.results && resData.results.transactions) {
                        transactions = resData.results.transactions
                        pagination = resData.results.meta.pagination
                    }

                    return {
                        transactions: transactions,
                        pagination: pagination,
                        isLoading: false,
                    }

                })

            })
            .catch((err) => {
                notify.error(err.message)
            })
    }

    _handleDownloadTransaction = () => {

        let searchObject = this.state.searchObject
        delete searchObject.page

        this._isLoadingDownload(true, (() => {
            downloadDanaTransactions(searchObject)
                .then((resData) => {
                    this._isLoadingDownload(false)
                })
                .catch((err) => {
                    this._isLoadingDownload(false)
                })
        })())

    }

    _isLoadingDownload = (isLoading, callback = null) => {
        this.setState({isLoadingDownload: isLoading}, () => {
            return callback
        })
    }

    componentDidMount() {

        if (this.state.isFirstOpened) {
            this.setState({
                isFirstOpened: false
            }, () => {
                this._handleGetPartners()
                this._handleGetData()
            })
        } else {
            this.props.history.replace({})
        }

    }

    render() {

        const {statuses, transactions, pagination, searchObject, isLoading, isLoadingDownload} = this.state

        const statusesOption = statuses.length > 0 ? statuses.map((status, index) => (
            <option value={status.code} key={index}>{status.name}</option>
        )) : null

        const previewLists = transactions && transactions.length > 0 ?
            transactions.map((transaction, index) => (
                <tr key={index}>
                    <th>{transaction.serviceLocation && transaction.serviceLocation.credential ? transaction.serviceLocation.credential.locationId : '-'}</th>
                    <td>{transaction.serviceLocation && transaction.serviceLocation.package ? transaction.serviceLocation.package.name : '-'}</td>
                    <td>{transaction.date || '-'}</td>
                    <td>{transaction.amountRupiah || '-'}</td>
                    <td>{transaction.number || transaction.requestId || transaction.orderId || '-'}</td>
                    <td>{transaction.partner || '-'}</td>
                    <td>{transaction.status ? transaction.status.message : '-'}</td>
                </tr>
            )) : null

        return (
            <LayoutAdmin>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-2">
                                        <FormInput name="v"
                                                   value={searchObject.v}
                                                   inputClass="input-inline"
                                                   placeholder="Enter (Search)"
                                                   change={this._handleChangeFilter}
                                                   keyPress={this._handleSearchEnter}/>
                                    </div>
                                    <div className="col-md-2">
                                        <FormSelect name="status"
                                                    defaultOption="Select Status"
                                                    value={searchObject.status}
                                                    options={statusesOption}
                                                    change={this._handleChangeFilter}/>
                                    </div>
                                    <div className="col-md-3">
                                        <DateRange nameFrom="fromDate"
                                                   nameTo="toDate"
                                                   valueFrom={searchObject.fromDate}
                                                   valueTo={searchObject.toDate}
                                                   change={this._handleChangeFilter}/>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <PrimaryButton title="Search" click={() => this._handleMovePage()}/>
                                            <PrimaryButton title="Download" btnClass="float-md-right"
                                                           isLoaded={isLoadingDownload}
                                                           click={() => this._handleDownloadTransaction()}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>Customer Number</th>
                                            <th>Product Label</th>
                                            <th>Date Time</th>
                                            <th>Amount</th>
                                            <th>No Reff</th>
                                            <th>Partner</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {isLoading ? <Loading isTable={true} colSpan="7"/> :
                                            previewLists || <NotAvailable isTable={true} colSpan="7"/>}
                                        </tbody>
                                    </table>
                                </div>

                                {!isLoading && (transactions.length > 0) ?
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <PaginationRow pagination={pagination}
                                                           onMove={(step) => this._handleMovePage(step)}/>
                                        </div>
                                    </div> : null}

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        );
    }

}

export default Dana;