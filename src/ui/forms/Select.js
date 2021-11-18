import React from "react"

const FormSelect = React.memo(props => {

    return (
        <div className={'form-group ' + (props.divClass || '')}>

            {props.label ? <label className="control-label">{props.label}</label> : null}

            <select id={props.id}
                    name={props.name}
                    className={'form-control ' + (props.selectClass || '')}
                    value={props.value}
                    onChange={props.change}
                    disabled={props.disabled}>

                {props.defaultOption ? <option value="">{props.defaultOption}</option> : null}

                {props.manualConvert ? (
                    props.options && props.options.length > 0 ? props.options.map((option, index) => (
                        <option value={option} key={index}>{option.toUpperCase()}</option>
                    )) : null
                ) : props.options}

            </select>

        </div>
    );

})

export {FormSelect}