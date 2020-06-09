import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const FormElement = (props) => {
  let inputChildren = undefined;

  let inputComponent = (
    <TextField
      fullWidth
      variant={props.variant ==='standard' ? props.variant : 'outlined' }
      label={props.title}
      error={!!props.error}
      type={props.type}
      name={props.propertyName}
      id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
      children={inputChildren}
      helperText={props.error}
      size={props.size}
    >
      {inputChildren}
    </TextField>
  );

  return inputComponent;
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  size: PropTypes.string,
};

export default FormElement;
