import React from "react"

const FilterFormInput = React.memo(props => {

    return (
        <div className={'form-group ' + (props.divClass || '')}>

            {props.label ? <label htmlFor={props.id}>{props.label}</label> : null}

            <input type={props.type || 'text'}
                   name={props.name}
                   id={props.id}
                   value={props.value}
                   className={'form-control ' + (props.inputClass || '')}
                   placeholder={props.placeholder || props.label || ''}
                   readOnly={props.readOnly}
                   disabled={props.disabled}
                   onChange={props.change}/>

        </div>
    );

})

export {FilterFormInput}