import React from 'react'

export const Loading = (props) => {

    let preview = null

    if (props.isTable) {
        preview = (
            <tr>
                <td colSpan={props.colSpan} className="text-center">
                    <h4 className="f-w-400">Loading.....</h4>
                </td>
            </tr>
        )
    } else {
        preview = (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="f-w-400">Loading.....</h4>
                </div>
            </div>
        )
    }

    return preview;

}

export const NotAvailable = (props) => {

    let preview = null

    if (props.isTable) {
        preview = (
            <tr>
                <td colSpan={props.colSpan} className="text-center">
                    <h4 className="f-w-400">Not Available</h4>
                </td>
            </tr>
        )
    } else {
        preview = (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="f-w-400">Not Available</h4>
                </div>
            </div>
        )
    }

    return preview;

}
