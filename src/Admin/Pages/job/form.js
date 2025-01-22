import React, { Component, useState } from "react";
import Button from "@mui/material/Button";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Card,
} from "@mui/material";
import { every, isEmpty, reject } from "lodash";
import { Cached, CheckCircle, Close, FastRewind } from "@mui/icons-material";
import {
  MuiAutoComplete,
  SelectBox,
  TextBox,
  UploadFileBox,
} from "../../../Components/form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../auth/useAuthContext";
import StepOne from "./form/step_one";
import StepTwo from "./form/step_two";
import StepThree from "./form/step_three";

const VehicleTypeTruck = [
  {
    label: "7.5t",
    value: "7.5t",
  },
  {
    label: "10t",
    value: "10t",
  },
  {
    label: "18t",
    value: "18t",
  },
  {
    label: "26t",
    value: "26t",
  },
  {
    label: "Trailer",
    value: "Trailer",
  },
  {
    label: "Attic",
    value: "Attic",
  },
];
const VehicleTypeVan = [
  {
    label: "Small van",
    value: "Small van",
  },
  {
    label: "SWB 2.4 m ",
    value: "SWB 2.4 m ",
  },
  {
    label: "Medium 3 m",
    value: "Medium 3 m",
  },
  {
    label: "Lwb 4m",
    value: "Lwb 4m",
  },
  {
    label: "XLWB",
    value: "XLWB",
  },
];
const VehicleType = [
  {
    label: "Choose Vehicle Type",
    value: 0,
  },
  {
    label: "Vans",
    value: "van",
  },

  {
    label: "Trucks/ lorrys",
    value: "truck",
  },
];
const MaterialSelect = [
  {
    label: "Choose Material",
    value: 0,
  },
  {
    label: "Liquid",
    value: "Liquid",
  },
  {
    label: "Solid",
    value: "Solid",
  },
  {
    label: "Gas",
    value: "Gas",
  },
  {
    label: "Solution",
    value: "Solution",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const DropTypeSelect = [
  {
    label: "Choose Address Type",
    value: 0,
  },
  {
    label: "Pickup",
    value: "pickup",
  },
  {
    label: "Drop",
    value: "drop",
  },
];

const Contant = () => {
  let { routeName, id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);

  const PickupAddress = {
    address: "",
    lat: 0,
    long: 0,
    type: "pickup",
  };

  const DropAddress = {
    address: "",
    lat: 0,
    long: 0,
    type: "drop",
  };

  const product = {
    product: {
      image: "",
      height: "",
      length: "",
      width: "",
      material: "",
      pickup_date: "",
      pickup_time: "",
      drop_date: "",
      drop_time: "",
    },
    address: [PickupAddress, DropAddress],
  };
  const itemsValidation = (values, errors) => {
    errors.items = [];
    let address = [];

    let itemObject = {};
    let addressObject = {};

    values?.items &&
      values?.items?.length > 0 &&
      values?.items.forEach((element, elementIndex) => {
        itemObject["product"] = {};

        if (element?.address?.length) {
          element.address.forEach((addressElement, addressIndex) => {
            if (!addressElement?.address) {
              addressObject = {
                address: "Address is required",
                index: addressIndex,
              };
            } else {
              addressObject = {
                address: "",
                index: addressIndex,
              };
            }
            address.push(addressObject);
            itemObject["address"] = address;
            addressObject = {};
          });
        }

        itemObject["product"]["index"] = elementIndex;

        if (!element?.product?.image) {
          itemObject["product"]["image"] = "Image is required";
        } else {
          itemObject["product"]["image"] = "";
        }

        if (!element?.product?.height) {
          itemObject["product"]["height"] = "Height is required";
        } else {
          itemObject["product"]["height"] = "";
        }

        if (!element?.product?.length) {
          itemObject["product"]["length"] = "Length is required";
        } else {
          itemObject["product"]["length"] = "";
        }

        if (!element?.product?.width) {
          itemObject["product"]["width"] = "Width is required";
        } else {
          itemObject["product"]["width"] = "";
        }

        if (!element?.product?.material) {
          itemObject["product"]["material"] = "Material is required";
        } else {
          itemObject["product"]["material"] = "";
        }

        if (!element?.product?.pickup_date) {
          itemObject["product"]["pickup_date"] = "Pickup date is required";
        } else {
          itemObject["product"]["pickup_date"] = "";
        }

        if (!element?.product?.pickup_time) {
          itemObject["product"]["pickup_time"] = "Pickup time is required";
        } else {
          itemObject["product"]["pickup_time"] = "";
        }

        if (!element?.product?.drop_date) {
          itemObject["product"]["drop_date"] = "Drop date is required";
        } else {
          itemObject["product"]["drop_date"] = "";
        }

        if (!element?.product?.drop_time) {
          itemObject["product"]["drop_time"] = "Drop time is required";
        } else {
          itemObject["product"]["drop_time"] = "";
        }

        if (!element?.product?.quantity) {
          itemObject["product"]["quantity"] = "Quantity is required";
        } else {
          itemObject["product"]["quantity"] = "";
        }

        errors.items.push({
          ...itemObject,
          address: address,
        });
        itemObject = {};
        address = [];
        addressObject = {};
      });

    if (errors?.items?.length) {
      let isAllProductEmpty = every(errors?.items, (product) => {
        let isProduct = false;
        let address = false;

        if (product?.address) {
          address = every(product?.address, (address) => !address?.address);
        }

        isProduct =
          isEmpty(product?.product?.image) &&
          isEmpty(product?.product?.height) &&
          isEmpty(product?.product?.length) &&
          isEmpty(product?.product?.width) &&
          isEmpty(product?.product?.material) &&
          isEmpty(product?.product?.pickup_date) &&
          isEmpty(product?.product?.pickup_time) &&
          isEmpty(product?.product?.drop_date) &&
          isEmpty(product?.product?.drop_time);

        if (isProduct && address) {
          return true;
        }
        return false;
      });
      if (isAllProductEmpty) {
        errors = delete errors.items;
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      vehicle: 0,
      vehical_type: 0,
      items: [product],
      description: "",
      created_by: routeName,
      driver_id: "",
      user_id: "",
      budget: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Job Title is required";
      }

      if (!values.driver_id) {
        errors.driver_id = "Driver is required";
      }

      if (values?.items?.length) {
        itemsValidation(values, errors);
      }
      if (!values.vehicle) {
        errors.vehicle = "Vehicle is required";
      }
      if (!values.vehical_type) {
        errors.vehical_type = "Vehicle Type is required";
      }

      if (!values.budget) {
        errors.budget = "Job budget is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors, setFieldValue }) => {
      values["items"] = JSON.stringify(values?.items);
      let url, method;

      if (id !== "create") {
        url = `/api/auth/master/jobs/update/${id}`;
        method = "POST";
      } else {
        url = `/api/auth/master/jobs/add`;
        method = "POST";
      }

      await apiAdminConfig
        .request({
          url: url,
          method: method,
          data: values,
        })
        .then((response) => {
          if (response?.status === 200) {
            setFieldValue("items", JSON.parse(values?.items));
            navigate(-1);
            snackbar({
              message: response.data.message,
              severity: "success",
            });
            formik.resetForm();
          } else {
            setFieldValue("items", JSON.parse(values?.items));
            snackbar({
              message: response.data.message,
              severity: "error",
            });
          }
        })
        .catch((error) => {
          setFieldValue("items", JSON.parse(values?.items));
          const { response } = error;
          if (response.status === 422) {
            values["items"] = JSON.parse(values?.items);
            console.log("response", response.data.error);
            // eslint-disable-next-line no-unused-vars
            for (const [key] of Object.entries(values)) {
              if (response.data.error[key]) {
                setErrors({ [key]: response.data.error[key][0] });
              }
            }
          }
          if (response?.data?.status === 406) {
            snackbar({
              message: response.data.message,
              severity: "error",
            });
          }
        });
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("user_id", user?.id);
  }, [user, user?.id]);

  console.log("formikformik", formik.values);
  const addProduct = () => {
    formik.setFieldValue("items", [...(formik.values.items || []), product]);
  };

  const addAddress = ({ productItem, productIndex }) => {
    // formik.setFieldValue(`items[${productIndex}].address`, [
    //   ...(productItem.address || []),
    //   address,
    // ]);
  };
  const removeProduct = (index) => {
    if (formik?.values?.items) {
      const data = formik.values.items.splice(index, 1);
      formik.setFieldValue("items", reject(formik.values.items, data));
    }
  };

  const removeAddress = (productIndex, addressIndex) => {
    if (formik?.values?.items) {
      const data = formik.values.items[productIndex]?.address.splice(
        addressIndex,
        1
      );
      formik.setFieldValue(
        `items[${productIndex}].address`,
        reject(formik.values.items[productIndex]?.address, data)
      );
    }
  };

  const bindData = async () => {
    await apiAdminConfig
      .get(`/api/auth/master/jobs/edit/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data) {
            let newData = response?.data?.view_data;
            for (const [key] of Object.entries(formik.values)) {
              if (key === "items") {
                formik.setFieldValue(
                  "items",
                  newData?.jobitems || newData?.items
                );
              } else {
                formik.setFieldValue([key], newData[key]);
              }
            }
          }
        }
      });
  };

  React.useEffect(() => {
    if (id !== "create") {
      bindData();
    }
  }, [id]);

  console.log("formik123", formik.values);
  const [vehicle, setVehicle] = React.useState([]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Card
            sx={{
              boxShadow: "none!important",
              borderRadius: "20px!important",
              mt: 4,
            }}
          >
            <CardContent>
              <Stack
                mb={4}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{ fontSize: "30px", fontWeight: 500 }}
                  >
                    {id !== "create" ? "Update Job" : "Create Job"}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      navigate(`/master/job/jobs/list`);
                    }}
                    sx={{
                      color: "#FF7534",
                      fontSize: "14px!important",
                      fontWeight: 400,
                      borderRadius: "15px",
                      lineHeight: 1,
                      padding: "0.875rem 1.5rem",
                    }}
                    variant="outlined"
                    color="primary"
                    startIcon={<FastRewind color="primary" />}
                  >
                    Back
                  </Button>
                </Box>
              </Stack>
              <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item md={12}>
                    <StepOne formik={formik} />
                  </Grid>
                  <Grid item md={12}>
                    <Box>
                      <Typography textAlign="left">Drivers</Typography>
                      <MuiAutoComplete
                        fullWidth
                        placeholder={"Select Driver"}
                        startIcon={false}
                        size={"small"}
                        url="api/auth/master/driver/get-customers"
                        value={formik.values.driver_id}
                        name={`driver_id`}
                        getOptionLabel="name"
                        getOptionValue="user_id"
                        onChange={(e) => {
                          formik.setFieldValue("driver_id", e);
                        }}
                        onInputChange={(e) => {
                          formik.setFieldValue("driver_id", e);
                        }}
                        helperText={
                          formik.touched.driver_id && formik.errors.driver_id
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <StepTwo
                      formik={formik}
                      id={id}
                      removeProduct={removeProduct}
                      addProduct={addProduct}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <StepThree formik={formik} />
                  </Grid>
                </Grid>

                <div style={{ textAlign: "right" }}>
                  <Stack direction="row" spacing={1} justifyContent="end">
                    <Button
                      // style={{ color: "#ffffff" }}
                      variant="outlined"
                      className="rounded"
                      type="submit"
                      startIcon={<CheckCircle color="primary" />}
                      sx={{
                        borderRadius: "15px!important",
                        padding: "0.875rem 1.5rem",
                        lineHeigth: 1,
                        fontSize: "14px!important",
                      }}
                    >
                      {id !== "create" ? "Update Job" : "Create Job"}
                    </Button>
                    <Button
                      sx={{
                        color: (theme) => theme.palette.common.white,
                        background: "#282f3a",
                        borderColor: "#282f3a",
                        borderRadius: "15px!important",
                        padding: "0.875rem 1.5rem",
                        lineHeigth: 1,
                        fontSize: "14px!important",
                        ":hover": {
                          background: "#181d23",
                          borderColor: "#181d23",
                          color: (theme) => theme.palette.common.white,
                        },
                      }}
                      variant="contained"
                      color="inherit"
                      className="rounded"
                      onClick={() => formik.resetForm()}
                      startIcon={
                        <Cached
                          sx={{
                            color: (theme) => theme.palette.common.white,
                          }}
                          color="common.white"
                        />
                      }
                    >
                      Reset
                    </Button>
                  </Stack>
                </div>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
    };
  }
  render() {
    return (
      <div>
        {this.state.windowWidth >= 600 ? (
          <Sidebar>
            <Contant />
          </Sidebar>
        ) : (
          <div style={{ width: "95%", margin: "80px auto" }}>
            {" "}
            <Contant />
          </div>
        )}
      </div>
    );
  }
}

export default JobForm;
