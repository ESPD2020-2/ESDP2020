import React from 'react';
import PropTypes from 'prop-types';


const FormElement = props => {

    let inputChildren = undefined;

    return (
        <div className="form-group">
            <label htmlFor={props.propertyName}>{props.title}</label>
        <input
            className="form-control"
            type={props.type}
            name={props.propertyName} id={props.propertyName}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            children={inputChildren}
        >
            {inputChildren}
        </input>
        </div>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
};

export default FormElement;