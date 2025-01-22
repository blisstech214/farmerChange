import { TextBox } from "../../../../Components/form";
import { Box, Typography } from "@mui/material";
import React from "react";

const StepOne = ({ formik }) => {
  return (
    <>
      <Box mb={2} sx={{ textAlign: "left" }}>
        <Typography fontSize={16} fontWeight={500}>
          Enter Job Title
        </Typography>
      </Box>
      <Box>
        <TextBox
          fullWidth
          placeholder={"Job Title"}
          label="Job Title"
          size={"small"}
          value={formik.values.name}
          name={`name`}
          onChange={formik.handleChange}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Box>
    </>
  );
};

export default StepOne;
