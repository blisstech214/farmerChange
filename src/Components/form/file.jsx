import {
  Box,
  CircularProgress,
  FormHelperText,
  Icon,
  InputAdornment,
  Stack,
  TextField,
  alpha,
} from "@mui/material";
import React from "react";
import { FormControl } from "./index";
import { green } from "@mui/material/colors";
import { apiAdminConfig } from "../../utils/api";

const UploadFileBox = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  const {
    name,
    label,
    accept,
    icon,
    value,
    size,
    required,
    inputAdornmentPosition,
    fullWidth,
    helperText,
    disabled,
    startIcon,
    endIcon,
  } = props;

  const fileUpload = async (e) => {
    props.onChange("");
    setMessage("");
    setError("");
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("item_image", file);
    setLoading(true);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await apiAdminConfig
      .post(`/${props.url}`, formData, config)
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setLoading(false);
          setMessage(data.message);
          props.onChange(data.image);
        } else {
          setLoading(false);
          setError(data.message);
        }
      })
      .catch((error) => {
        const { response } = error;
        setLoading(false);
        setError(response.data.message);
      });
  };

  return (
    <React.Fragment>
      <input
        style={{ display: "none" }}
        id={`${name}-document-file`}
        type="file"
        accept={accept}
        onChange={(e) => {
          fileUpload(e);
          e.target.value = null;
        }}
      />

      <FormControl
        key={`${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
        required={required}
        size={size}
      >
        <Stack direction="row" width="100%">
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
            error={helperText || error ? true : false}
            success={error ? false : true}
            name={name}
            label={label}
            variant="outlined"
            type="url"
            readOnly={disabled}
            size={size}
            required={required}
            disabled={disabled}
            value={value}
            onChange={(e) => props.onChange(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position={inputAdornmentPosition}>
                  {loading && <CircularProgress size={25} />}
                  <label htmlFor={`${name}-document-file`}>
                    {!loading && <Icon>{icon}</Icon>}
                  </label>
                </InputAdornment>
              ),
            }}
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

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {error && <FormHelperText>{error}</FormHelperText>}
        {message && (
          <FormHelperText style={{ color: green[500] }}>
            {message}
          </FormHelperText>
        )}
      </FormControl>
    </React.Fragment>
  );
};

export default UploadFileBox;
