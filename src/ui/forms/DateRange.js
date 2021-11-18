import React, {Component} from "react";

import $ from 'jquery'

class DateRange extends Component {

    componentDidMount() {

        const self = this

        $('.input-daterange').datepicker({
            singleDatePicker: true,
            showDropdowns: true,
            clearBtn: true,
            format: 'dd/mm/yyyy'
        })

        $('input[name="' + self.props.nameFrom + '"]').on('changeDate', function (event) {
            let send = true;
            if (typeof (event) == 'object') {
                if (event.timeStamp - self.LAST_START_TIMESTAMP_CHANGE < 300) {
                    send = false;
                }
                self.LAST_START_TIMESTAMP_CHANGE = event.timeStamp;
            }
            if (send) {
                self.props.change(event)
            }
        });

        $('input[name="' + self.props.nameTo + '"]').on('changeDate', function (event) {

            let send = true;
            if (typeof (event) == 'object') {
                if (event.timeStamp - self.LAST_END_TIMESTAMP_CHANGE < 300) {
                    send = false;
                }
                self.LAST_END_TIMESTAMP_CHANGE = event.timeStamp;
            }
            if (send) {
                self.props.change(event)
            }

        });

    }

    render() {
        const props = this.props

        return (
            <div className={'form-group ' + (props.divClass || '')}>
                {props.label ? <label>{props.label}</label> : null}
                <div>
                    <div className={'input-daterange input-group ' + (props.divSecondClass || '')}
                         data-provide="datepicker">

                        <input type="text"
                               id={props.nameFrom}
                               name={props.nameFrom}
                               value={props.valueFrom}
                               className={'form-control ' + props.inputClass}
                               placeholder={props.placeholderFrom || 'From: 01/01/2021'}
                               readOnly={props.readOnly || true}
                               disabled={props.disabled || ''}
                               onChange={props.change}
                               autoComplete={props.autoComplete || 'off'}/>

                        <input type="text"
                               id={props.nameTo}
                               name={props.nameTo}
                               value={props.valueTo}
                               className={'form-control ' + props.inputClass}
                               placeholder={props.placeholderTo || 'To: 31/01/2021'}
                               readOnly={props.readOnly || true}
                               disabled={props.disabled || ''}
                               onChange={props.change}
                               autoComplete={props.autoComplete || 'off'}/>

                    </div>
                </div>
            </div>
        )
    }

}

export default DateRange
