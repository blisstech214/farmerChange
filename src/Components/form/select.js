import {
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormControl } from "./index";
import PropTypes from "prop-types";
const SelectBox = (props) => {
  const {
    name,
    label = "",
    value,
    required,
    options,
    fullWidth,
    helperText,
    isRequired,
    size,
    inputEndAdornmentPosition = "end",
    inputStartAdornmentPosition = "start",
    startIcon,
    endIcon,
    placeholder,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      style={
        !fullWidth ? { width: "50%", paddingLeft: 5, paddingRight: 5 } : {}
      }
    >
      {label && <InputLabel>{`${label} ${isRequired ? "*" : ""}`}</InputLabel>}

      <Select
        size={size}
        name={name}
        label={label}
        required={required}
        value={value}
        onChange={(e) => props.onChange(e)}
        inputProps={{
          name: name,
        }}
        placeholder={placeholder}
        renderInput={(params) => (
          <TextField {...params} label="10,000 options" />
        )}
        sx={{
          textAlign: "left  ",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={inputEndAdornmentPosition}>
              {/* <Icon>{icon}</Icon> */}
              {endIcon}
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position={inputStartAdornmentPosition}>
              {/* <Icon>{icon}</Icon> */}
              {startIcon}
            </InputAdornment>
          ),
        }}
      >
        {options &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

SelectBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
};
export default SelectBox;
