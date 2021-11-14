import React from 'react'

const DefaultButton = ({props, btnColor}) => {
    return (
        <button type={props.type || 'button'}
                id={props.id}
                disabled={props.disabled}
                onClick={props.click}
                className={`btn waves-effect waves-light ${(btnColor || 'btn-default')} ${(props.customClass || '')}`}>
            {props.title}
        </button>
    );
}

const PrimaryButton = (props) => {
    return (<DefaultButton props={props} btnColor="btn-primary"/>);
}

const SuccessButton = (props) => {
    return (<DefaultButton props={props} btnColor="btn-success"/>);
}

const InfoButton = (props) => {
    return (<DefaultButton props={props} btnColor="btn-info"/>);
}

const WarningButton = (props) => {
    return (<DefaultButton props={props} btnColor="btn-warning"/>);
}

const DangerButton = (props) => {
    return (<DefaultButton props={props} btnColor="btn-danger"/>);
}

export {PrimaryButton, SuccessButton, InfoButton, WarningButton, DangerButton}
