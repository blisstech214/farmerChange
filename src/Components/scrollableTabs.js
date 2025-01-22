import { useContext } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import * as React from "react";
import { Box, Stack, Typography, styled } from "@mui/material";
import { CustomeButton, SubmitButton } from "./button";
import { StepperContext } from "./stepper/stepperContext";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useParams } from "react-router-dom";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

let highestIndex = 0;

const ScrollableTabs = ({
  tabs,
  formik,
  isLastStep,
  disabled,
  hideButton,
  setStep,
}) => {
  const { id } = useParams();
  const { value, setValue, handleChange } = useContext(StepperContext);
  const checkError = () => {
    let selectTab = [];
    if (tabs) {
      tabs.map((element, index) => {
        if (element?.fields && formik?.errors) {
          const isEquipmentTranster = formik?.errors?.equipment_transfers;
          const errors = Object.keys(formik.errors);
          element.fields.map((item, i) => {
            if (errors.includes(item)) {
              // set default tab for error
              selectTab.push(index);
            } else if (isEquipmentTranster) {
              if (isEquipmentTranster[element.fields[i]]) {
                selectTab.push(index);
              }
            }
          });
        }
      });
    }

    if (selectTab && selectTab.length) {
      setValue(selectTab[0]);
      if (selectTab[0] >= highestIndex) {
        highestIndex = selectTab[0];
      }
    }
  };

  React.useEffect(() => {
    if (formik.isSubmitting) {
      checkError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  const _handleBack = () => {
    setValue(value - 1);
  };
  return (
    <>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#A1242E",
            },
          }}
        >
          {tabs &&
            tabs.map((tab, index) => (
              <Tab
                disabled={
                  index > highestIndex && id === "create" ? true : false
                }
                sx={{
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  backgroundColor:
                    Number(value) === index
                      ? "rgb(220, 163, 43)!important"
                      : "",
                  color:
                    Number(value) === index
                      ? "rgb(255, 255, 255) !important"
                      : "",
                }}
                key={`tab${index}`}
                label={tab.title}
                value={index}
              />
            ))}
        </TabList>
        <br />
        {tabs &&
          tabs.map((tab, index) => (
            <TabPanel sx={{ p: 0, my: 2 }} key={`tab${index}`} value={index}>
              {tab.component}
            </TabPanel>
          ))}
      </TabContext>
      {!hideButton && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="left"
            sx={{ marginTop: "20px" }}
          >
            {value !== 0 && (
              <Box sx={{ width: "20%" }}>
                <CustomeButton
                  color="primary"
                  onClick={() => _handleBack()}
                  variant="outlined"
                  title="Previous"
                  disabled={value <= 0}
                />
              </Box>
            )}

            <Box sx={{ width: "20%" }}>
              <SubmitButton
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting || disabled}
                variant="contained"
                title={
                  isLastStep ? (id === "create" ? "Create" : "Update") : "Next"
                }
              />
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

ScrollableTabs.propTypes = {
  tabs: PropTypes.array,
  formik: PropTypes.object,
  isLastStep: PropTypes.any,
  hideButton: PropTypes.any,
  disabled: PropTypes.any,
  value: PropTypes.any,
};

export default ScrollableTabs;
