import {
  Box,
  FormHelperText,
  Icon,
  InputAdornment,
  Stack,
  TextField,
  alpha,
} from "@mui/material";
import React from "react";
import { FormControl } from "./index";
import PropTypes from "prop-types";

const PasswordBox = (props) => {
  const [showPassword, setShowPassword] = React.useState("");

  const {
    name,
    label,
    startIcon,
    value,
    required,
    inputAdornmentPosition,
    fullWidth,
    helperText,
    disabled,
    placeholder,
    size,
  } = props;

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
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
          name={name}
          size={size}
          placeholder={placeholder}
          label={label}
          type={showPassword ? "text" : "password"}
          required={required}
          value={value}
          disabled={disabled}
          // autoComplete={"false"} //MUI pickUp the string value on autoComplete
          autoComplete="new-password"
          onChange={(e) => props.onChange(e)}
          InputProps={
            {
              // endAdornment: (
              //   <InputAdornment position={inputAdornmentPosition || "end"}>
              //     <Icon onClick={() => setShowPassword(!showPassword)} color="primary" fontSize="small">
              //       {showPassword ? "visibility" : "visibility_off"}
              //     </Icon>
              //   </InputAdornment>
              // ),
              // startAdornment: (
              //   <InputAdornment position={inputAdornmentPosition || "start"}>
              //     {startIcon}
              //   </InputAdornment>
              // ),
            }
          }
        />
        <Box
          sx={{
            ml: 0,
            background: (theme) => theme.palette.grey[300],
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
            padding: ".375rem .75rem",
            borderRadius: ".25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            onClick={() => setShowPassword(!showPassword)}
            color="primary"
            fontSize="small"
            sx={{ fontSize: "18px!important" }}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </Icon>
        </Box>
      </Stack>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

PasswordBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  inputAdornmentPosition: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default PasswordBox;
