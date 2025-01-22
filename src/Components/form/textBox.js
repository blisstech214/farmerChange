import {
  FormHelperText,
  Icon,
  InputAdornment,
  TextField,
  Box,
  Stack,
  alpha,
} from "@mui/material";
import PropTypes from "prop-types";
import { FormControl } from "./index";

const TextBox = (props) => {
  const {
    name,
    label,
    format,
    variant,
    type,
    InputLabelProps,
    startIcon,
    endIcon,
    value,
    required,
    multiline,
    inputEndAdornmentPosition = "end",
    inputStartAdornmentPosition = "start",
    fullWidth,
    helperText,
    disabled,
    rows,
    onKeyDown,
    isMaxLenght,
    maxLength,
    sx,
    size,
    formSx,
    placeholder,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      sx={formSx}
      size={size}
    >
      <Stack direction="row">
        {startIcon && (
          <Box
            sx={{
              ml: 0,
              background: (theme) => theme.palette.grey[100],
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
              padding: ".375rem .75rem",
              borderRadius: ".25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {startIcon}
          </Box>
        )}
        <TextField
          fullWidth={fullWidth}
          error={helperText ? true : false}
          variant={variant}
          name={name}
          sx={{
            "&.MuiOutlinedInput-input": {
              background: (theme) => theme.palette.common.white,
            },
          }}
          label={label}
          InputLabelProps={InputLabelProps}
          type={type}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          size={size}
          format={format}
          rows={rows}
          multiline={multiline}
          required={required}
          disabled={disabled}
          autoComplete={"false"}
          value={value}
          onChange={(e) => props.onChange(e)}
          inputProps={{ maxLength: isMaxLenght ? isMaxLenght : null }}
          InputProps={
            {
              // endAdornment: (
              //   <InputAdornment position={inputEndAdornmentPosition}>
              //     {/* <Icon>{icon}</Icon> */}
              //     {endIcon}
              //   </InputAdornment>
              // ),
              // startAdornment: (
              //   <InputAdornment position={inputStartAdornmentPosition}>
              //     {/* <Icon>{icon}</Icon> */}
              //     {startIcon}
              //   </InputAdornment>
              // ),
            }
          }
        />
        {endIcon && (
          <Box
            sx={{
              ml: 0,
              background: (theme) => theme.palette.grey[100],
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
              padding: ".375rem .75rem",
              borderRadius: ".25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {endIcon}
          </Box>
        )}
      </Stack>

      <Box sx={{ display: "flex" }}>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </Box>
    </FormControl>
  );
};

TextBox.propTypes = {
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

export default TextBox;
