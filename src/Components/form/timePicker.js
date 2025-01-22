import { FormHelperText, Box } from "@mui/material";
import PropTypes from "prop-types";
import { FormControl } from "./index";
import { TimePicker } from "@mui/x-date-pickers";
import React from "react";
import dayjs from "dayjs";
import moment from "moment";

const TimePickerBox = (props) => {
  const {
    name,
    label,
    format,
    variant,
    type,
    InputLabelProps,
    value,
    required,
    fullWidth,
    helperText,
    disabled,
    onKeyDown,
    size,
    formSx,
    dateValue,
    placeholder,
    ...rest
  } = props;

  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    if (value) {
      setDate(
        dayjs(`${dateValue}T${moment(value, "hh:mm a").format("HH:mm")}`)
      );
    } else {
      setDate(null);
    }
  }, [value, dateValue]);

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      sx={formSx}
      size={size}
    >
      <TimePicker
        {...rest}
        fullWidth={fullWidth}
        error={helperText ? true : false}
        variant={variant}
        name={name}
        label={label}
        InputLabelProps={InputLabelProps}
        type={type}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        size={size}
        format={format}
        required={required}
        disabled={disabled}
        autoComplete={"false"}
        value={date}
        onChange={(e) => props.onChange(e)}
      />
      <Box sx={{ display: "flex" }}>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </Box>
    </FormControl>
  );
};

TimePickerBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  format: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  InputLabelProps: PropTypes.string,
  icon: PropTypes.string,
  inputAdornmentPosition: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
  rows: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default TimePickerBox;
