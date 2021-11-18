import React, {Component} from "react";

import LayoutAdmin from "../../../ui/layouts/Admin";
import DateRange from "../../../ui/forms/DateRange";
import {FormInput} from "../../../ui/forms/Input";
import {FormSelect} from "../../../ui/forms/Select";
import {PrimaryButton} from "../../../ui/components/Buttons";
import PaginationRow from "../../../ui/components/PaginationRow";

import * as notify from "../../../lib/notification";
import {getPartners} from "../../../lib/partners";
import {getAllTransactions, downloadAllTransactions} from "../../../lib/transaction";
import {Loading, NotAvailable} from "../../../ui/Processing";

class All extends Component {

    state = {
        transactions: [],
        partners: [],
        partnerStatuses: [],
        statuses: [],
        isFirstOpened: true,
        searchObject: {
            v: '',
            partner: '',
            status: '',
            fromDate: '',
            toDate: '',
            page: 1
        },
        pagination: {},
        isLoading: true,
        isLoadingDownload: false
    }

    _handleGetPartners = () => {
        getPartners()
            .then((resData) => {

                let partnerStatuses = []

                this.setState(() => {

                    if (resData && resData.results && resData.results.partners) {
                        partnerStatuses = resData.results.partners
                    }

                    return {
                        partnerStatuses: partnerStatuses,
                        partners: partnerStatuses.map((partner) => {
                            return {
                                code: partner.key,
                                name: partner.name
                            }
                        })
                    }

                })

            })
            .catch((err) => {
                notify.error(err.message)
            })
    }

    _handleChangeFilter = (event) => {

        let target = event.target;
        let value = target.value;
        let name = target.name

        this.setState((prevState) => {

            let newStatuses = prevState.statuses
            let newSearchObject = prevState.searchObject

            newSearchObject[name] = value

            if (name === 'partner') {

                newSearchObject['status'] = ''

                if (value) {
                    let partnerStatus = prevState.partnerStatuses.find((partnerStatus) => {
                        return partnerStatus.key === value
                    })
                    if (partnerStatus) {
                        newStatuses = partnerStatus.attributes ? partnerStatus.attributes.map((attribute) => {
                            return {
                                code: attribute.code,
                                name: attribute.message
                            }
                        }) : []
                    }
                } else {
                    newStatuses = []
                    newSearchObject.v = ''
                }

            }

            return {
                searchObject: newSearchObject,
                statuses: newStatuses
            }

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
        getAllTransactions(this.state.searchObject)
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
            downloadAllTransactions(searchObject)
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

        const {partners, statuses, searchObject, transactions, pagination, isLoading, isLoadingDownload} = this.state

        const partnersOption = partners.map((partner, index) => (
            <option value={partner.code} key={index}>{partner.name}</option>
        ))

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
                                        <FormSelect name="partner"
                                                    defaultOption="Select Partner"
                                                    value={searchObject.partner}
                                                    options={partnersOption}
                                                    change={this._handleChangeFilter}/>
                                    </div>
                                    {searchObject.partner ?
                                        <div className="col-md-2">
                                            <FormInput name="v"
                                                       value={searchObject.v}
                                                       inputClass="input-inline"
                                                       placeholder="Enter (Search)"
                                                       change={this._handleChangeFilter}
                                                       keyPress={this._handleSearchEnter}/>
                                        </div> : null}
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
                                    <div className={searchObject.partner ? 'col-md-3' : 'col-md-5'}>
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

export default All;