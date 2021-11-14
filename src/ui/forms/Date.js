import React from 'react'

import $ from 'jquery'

export const changeDateFormat = (format = 'dd/mm/yyyy') => {
    $('.input-daterange').datepicker({
        singleDatePicker: true,
        showDropdowns: true,
        clearBtn: true,
        format: format
    })
}

const DateRange = React.memo(props => {

    return (
        <div className={'form-group ' + (props.divClass || '')}>
            {props.label ? <label>{props.label}</label> : null}
            <div>
                <div className={'input-daterange input-group ' + (props.divSecondClass || '')}
                     data-provide="datepicker">

                    <input type="text"
                           id={props.nameFrom || 'fromDate'}
                           name={props.nameFrom || 'fromDate'}
                           className={'form-control ' + props.inputClass}
                           placeholder={props.placeholderFrom || 'From: 01/01/2021'}
                           readOnly={props.readOnly}
                           disabled={props.disabled}
                           onChange={props.change}
                           autoComplete={props.autoComplete || 'off'}/>

                    <input type="text"
                           id={props.nameTo || 'toDate'}
                           name={props.nameTo || 'toDate'}
                           className={'form-control ' + props.inputClass}
                           placeholder={props.placeholderTo || 'To: 31/01/2021'}
                           readOnly={props.readOnly}
                           disabled={props.disabled}
                           onChange={props.change}
                           autoComplete={props.autoComplete || 'off'}/>

                </div>
            </div>
        </div>
    );

})

export {DateRange}