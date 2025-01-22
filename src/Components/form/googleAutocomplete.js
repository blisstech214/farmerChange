import React from "react";
import {
  Box,
  Divider,
  FormHelperText,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LocationOnOutlined } from "@mui/icons-material";
import FormControl from "./formControl";
const GoogleAutocomplete = (props) => {
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
    min,
    readOnly,
    onSelect,
    textBoxSx,
    isBackgroundColor = false,
    IconSx,
    onChange,
    EndIconClick,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelect = async (value) => {
    let address, lat, long;
    address = value;
    await geocodeByAddress(address)
      .then((results) => {
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        lat = latLng?.lat;
        long = latLng?.lng;
        console.log("latLng", latLng);
      })
      .catch((error) => {
        address = "";
        // latLongValue = "";
        console.error("Error", error);
      });
    await onSelect(address, lat, long);
  };

  return (
    <Box sx={{ my: 4, width: "100%", position: "relative", height: "100%" }}>
      <PlacesAutocomplete
        value={value}
        onChange={(e) => onChange(e)}
        onSelect={(e) => handleSelect(e)}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          console.log("suggestions", suggestions);

          return (
            <Box component="div">
              <FormControl
                key={`key${name}`}
                error={helperText ? true : false}
                fullWidth={fullWidth}
                sx={{
                  ...formSx,
                  borderRadius: "0.25rem",
                }}
                size={size}
              >
                <TextField
                  fullWidth={fullWidth}
                  error={helperText ? true : false}
                  variant={"outlined"}
                  sx={
                    !isBackgroundColor
                      ? {
                          "& .MuiOutlinedInput-input": {
                            background: (theme) => theme.palette.common.white,
                            borderRadius: "0.25rem",
                          },
                        }
                      : { ...textBoxSx }
                  }
                  label={label}
                  InputLabelProps={InputLabelProps}
                  type={type}
                  onKeyDown={onKeyDown}
                  placeholder={placeholder}
                  size={size}
                  rows={rows}
                  min={min}
                  multiline={multiline}
                  required={required}
                  disabled={disabled}
                  autoComplete={"false"}
                  inputProps={{
                    maxLength: isMaxLenght ? isMaxLenght : null,
                    min: min,
                    readOnly: readOnly,
                    onKeyDown: onKeyDown,
                  }}
                  InputProps={{
                    readOnly: readOnly,
                    min: min,
                    endAdornment: (
                      <>
                        {endIcon && (
                          <InputAdornment position={inputEndAdornmentPosition}>
                            {endIcon}
                          </InputAdornment>
                        )}
                      </>
                    ),
                    startAdornment: (
                      <>
                        {startIcon && (
                          <InputAdornment
                            position={inputStartAdornmentPosition}
                          >
                            {startIcon}
                          </InputAdornment>
                        )}
                      </>
                    ),
                  }}
                  {...getInputProps({
                    placeholder: "Search Address ...",
                    className: "location-search-input",
                  })}
                />
                <Box sx={{ display: "flex" }}>
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </Box>
              </FormControl>

              <Box
                sx={
                  {
                    // position: 'absolute',
                    // backgroundColor: 'white',
                    // // zIndex: 1300,
                    // inset: "0px auto auto 0px",
                    // transform: "translate3d(0px, 36px, 0px)",
                    // listView: {
                    //   position: 'absolute',
                    //   backgroundColor: 'white',
                    //   zIndex: 1300,
                    // }
                  }
                }
                className="autocomplete-dropdown-container"
              >
                <Paper
                  elevation={5}
                  sx={{
                    height: "max-content",
                    maxHeight: "200px",
                    overflow: "hidden",
                    overflowY: "scroll",
                    background: (theme) => theme.palette.common.white,
                  }}
                >
                  <Box>
                    {loading && <Box>Loading...</Box>}
                    {!loading &&
                      suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <React.Fragment key={`${name}-${index}`}>
                            {/* <nav aria-label="main mailbox folders"> */}
                            <List
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>
                                    <LocationOnOutlined />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={suggestion.description}
                                  />
                                </ListItemButton>
                              </ListItem>
                            </List>
                            {/* </nav> */}
                            <Divider />
                          </React.Fragment>
                        );
                      })}
                  </Box>
                </Paper>
              </Box>
            </Box>
          );
        }}
      </PlacesAutocomplete>
    </Box>
  );
};

export default GoogleAutocomplete;
