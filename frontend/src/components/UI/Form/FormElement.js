import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FileInput from "./FileInput";

const FormElement = (props) => {
  let inputChildren = undefined;

  if (props.type === 'select') {
    inputChildren = props.options.map(o => (
      <MenuItem key={o.id} value={o.id}>
        {o.title}
      </MenuItem>
    ));
  }

  let inputComponent = (
    <TextField
      fullWidth
      variant={props.variant ==='standard' ? props.variant : 'outlined' }
      label={props.title}
      error={!!props.error}
      type={props.type}
      select={props.type === 'select'}
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

  if (props.type === "file") {
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        onChange={props.onChange}
        error={!!props.error}
      />
    );
  }

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
