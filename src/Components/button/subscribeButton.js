import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";

const SubscribeButton = () => {
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
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                "&.MuiButton-root": {
                  borderRadius: "30px",
                  width: {
                    md: "150px !important",
                    sm: "100px !important",
                    xs: "100px !important",
                  },
                  padding: "8px",
                },
              }}
            >
              Sent
            </Button>
          </InputAdornment>
        ),
      }}
      size="small"
      color="primary"
      sx={{
        "&.MuiTextField-root": {
          background: (theme) => theme.palette.common.white,
          borderRadius: "30px !important",
          fontSize: "14px !important",
          width: { md: "500px", sm: "100%", xs: "100%" },
        },
        "& .MuiOutlinedInput-root": {
          paddingRight: "2px !important",
          overflow: "hidden",
        },
        "& .MuiOutlinedInput-input": {
          color: (theme) => theme.palette.common.black,
          background: (theme) => theme.palette.common.white,
          borderRadius: "30px 0px 0px 30px !important",
          paddingRight: "12px !important",
          padding: "12px",
          fontSize: "14px !important",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "30px !important",
        },
      }}
      id="outlined-basic"
      variant="outlined"
      placeholder="Enter your email address"
    />
  );
};

export default SubscribeButton;
