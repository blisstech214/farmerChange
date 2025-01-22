import { Button, InputAdornment, TextField, alpha } from "@mui/material";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
const NewsLetterButton = () => {
  return (
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{ background: (theme) => theme.palette.common.white }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                "&.MuiButton-root": {
                  borderRadius: "0px 5px 5px 0px",
                  width: {
                    md: "20px !important",
                    sm: "auto !important",
                    xs: "auto !important",
                  },
                  padding: "10px",
                  px: "5px",
                },
              }}
            >
              <ArrowRightAltIcon />
            </Button>
          </InputAdornment>
        ),
      }}
      size="small"
      color="primary"
      sx={{
        "&.MuiTextField-root": {
          background: (theme) => alpha(theme.palette.grey[400], 0.4),
          borderRadius: "0px 5px 5px 0px !important",
          fontSize: "14px !important",
          width: { md: "100%", sm: "100%", xs: "100%" },
        },
        "& .MuiOutlinedInput-root": {
          paddingRight: "0px !important",
          px: "0px !important",
          overflow: "hidden",
        },
        "& .MuiOutlinedInput-input": {
          color: (theme) => theme.palette.common.black,
          background: (theme) => alpha(theme.palette.grey[400], 0.4),
          borderRadius: "0px 5px 5px 0px !important",
          paddingRight: "12px !important",
          padding: "12px",
          fontSize: "14px !important",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "0px 5px 5px 0px !important",
        },
      }}
      id="outlined-basic"
      variant="outlined"
      placeholder="Email"
    />
  );
};

export default NewsLetterButton;
