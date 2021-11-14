import React, {Component} from 'react';

import LayoutAdmin from "../../../ui/layouts/Admin";
import {DateRange, changeDateFormat} from "../../../ui/forms/Date"
import {FilterFormInput} from "../../../ui/forms/Input"
import {FilterFormSelect} from "../../../ui/forms/Select"
import {PrimaryButton} from "../../../ui/components/Buttons"

class All extends Component {

    componentDidMount() {
        changeDateFormat()
    }

    render() {

        return (
            <LayoutAdmin>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-2">
                                        <FilterFormInput id="search"
                                                         inputClass="input-inline"
                                                         placeholder="Enter (Search)"/>
                                    </div>
                                    <div className="col-md-2">
                                        <FilterFormSelect id="partner" defaultOption="Select Partner"/>
                                    </div>
                                    <div className="col-md-2">
                                        <FilterFormSelect id="status" defaultOption="Select Status"/>
                                    </div>
                                    <div className="col-md-3">
                                        <DateRange/>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <PrimaryButton title="Search"/>
                                            <PrimaryButton title="Download" customClass="float-md-right"/>
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
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        );
    }

}

export default All;