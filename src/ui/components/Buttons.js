import React from 'react'

const DefaultButton = ({props, btnColor}) => {
    return (
        <button type={props.type || 'button'}
                id={props.id}
                disabled={props.disabled || props.isLoaded}
                onClick={props.click}
                className={`btn waves-light waves-effect ${(btnColor || 'btn-default')} ${(props.btnClass || '')}`}>
            {props.title} {props.isLoaded ? <span className="bx bx-loader"/> : null}
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
