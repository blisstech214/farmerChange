/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormControl } from "./index";
import { find, debounce } from "lodash";
import { CircularProgress, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
import { apiAdminConfig } from "../../utils/api";

const MuiAutocomplete = (props) => {
  const {
    name,
    label,
    forceLoading,
    value,
    placeholder,
    url,
    required,
    fullWidth,
    helperText,
    disabled,
    getOptionLabel,
    getOptionValue,
    filter,
    variant,
    starReq,
    isCostType = false,
    size,
  } = props;
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    getData();
  }, [value]);

  React.useEffect(() => {
    if (value) {
      const defaultValue = find(options, { value: Number(value) });
      if (defaultValue) {
        setSearch(defaultValue.label);
      }
    }
  }, [value, options]);

  const getLabel = (element) => {
    if (element && element[getOptionLabel]) {
      return element[getOptionLabel];
    } else {
      return "";
    }
  };

  const getValue = (element) => Number(element[getOptionValue]);

  const getData = async (search = null) => {
    setLoading(true);

    const params = {
      search: search,
      //   page: 1,
      //   pageSize: 10,
      //   defaultValue: value,
    };

    if (filter) {
      filter.forEach((element) => {
        params[element.field] = element.value;
      });
    }

    let options = [];

    await apiAdminConfig
      .get(url, { params })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.view_data) {
            response.data.view_data.forEach((element) => {
              if (isCostType) {
                options.push({
                  label: element?.cost_type || "",
                  value: element?.id || "",
                });
              } else {
                options.push({
                  label: getLabel(element),
                  value: getValue(element),
                });
              }
            });
            setOptions(options);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (forceLoading === true) {
      getData();
    }
  }, [forceLoading]);

  React.useEffect(() => {
    if (filter) {
      getData();
      setSearch("");
    }
  }, [filter]);

  const delayedQuery = React.useCallback(debounce(getData, 1000), []);

  const handleOnChange = (value) => {
    setSearch(value);
    if (!value) {
      props.onChange(null);
    }
    delayedQuery(value);
  };

  const setValue = (option) => {
    if (option) {
      props.onChange(option.value);
    } else {
      props.onChange(null);
    }
  };

  const defaultValue = find(options, { value: Number(value) });

  return (
    <FormControl
      key={`key${name}`}
      error={helperText ? true : false}
      fullWidth={fullWidth}
      required={required}
    >
      <Autocomplete
        size={size}
        disabled={disabled}
        options={options}
        defaultValue={defaultValue}
        autoHighlight
        loading={loading}
        variant={variant}
        inputValue={search}
        onInputChange={(event, newInputValue) => {
          if (event?.type === "change") {
            handleOnChange(newInputValue);
          }
        }}
        onChange={(event, newValue) => {
          if (event?.type === "click") {
            setValue(newValue);
            if (newValue == null) {
              setSearch("");
            }
          }
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            error={helperText ? true : false}
            {...params}
            label={label}
            variant={variant}
            required={starReq}
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              autoComplete: "off", // disable autocomplete and autofill
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

MuiAutocomplete.defaultProps = {
  variant: "outlined",
  fullWidth: true,
  required: false,
  disabled: false,
  helperText: null,
  forceLoading: false,
  getOptionLabel: "label",
  getOptionValue: "value",
  filter: null,
  onChange: () => {},
};

MuiAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  forceLoading: PropTypes.bool,
  getOptionLabel: PropTypes.string,
  getOptionValue: PropTypes.string,
  filter: PropTypes.array,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  starReq: PropTypes.string,
};

export default MuiAutocomplete;
