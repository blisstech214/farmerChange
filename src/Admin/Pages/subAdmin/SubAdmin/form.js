import React, { Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../admin.css";
import Sidebar from "../../../SideNav/sideBar";
import Loader from "../../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../../utils/api";
import { useSnackbar } from "../../../../provider/snackbar";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Autocomplete,
  FormHelperText,
  TextField,
} from "@mui/material";
import FastRewind from "@mui/icons-material/FastRewind";
import { Lock } from "@mui/icons-material";
import { FormControl, PasswordBox } from "../../../../Components/form";
import useMenu from "../../../../hooks/useMenu";
import ScrollableTabs from "../../../../Components/scrollableTabs";
import { StepperContext } from "../../../../Components/stepper/stepperContext";
import RolePermission from "./rolePermission";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const snackbar = useSnackbar();
  const { value, setValue } = React.useContext(StepperContext);
  const isLastStep = value === 2 - 1;

  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [clinics, setClinics] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [licenceFile, setLicenceFile] = useState(null);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const { navConfigMenu, permissions } = useMenu();
  console.log("navConfigMenu", permissions);
  const DropList = [
    {
      label: "Select Data",
      value: 0,
    },
    {
      label: "Data 1",
      value: "data",
    },
    {
      label: "Data 2",
      value: "data",
    },
  ];
  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_type: "admin",
      email: "",
      password: "",
      mobile: "",
      password_confirmation: "",
      menus: ["dashboard-subheader-root", "management-subheader-root"],
    },
    validate: (values) => {
      const errors = {};
      if (!values.user_name) {
        errors.user_name = "Sub admin name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.mobile) {
        errors.mobile = "Phone is required";
      } else if (!/^[0-9]{10}$/.test(values.mobile)) {
        errors.mobile = "Please enter valid number";
      }

      if (id === "create") {
        if (!values.password_confirmation) {
          errors.password_confirmation = "Confirm password is required";
        }

        if (
          values.password &&
          values.password_confirmation &&
          values.password !== values.password_confirmation
        ) {
          errors.password_confirmation =
            "Confirm password not match with previous password";
        }

        if (!values.password) {
          errors.password = "Password is required";
        }
      }
      if (values.menus?.length <= 0) {
        errors.menus = "Menus is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url, method;

      if (id !== "create") {
        url = `/api/auth/master/admin/update/${id}`;
        method = "POST";
      } else {
        url = `/api/auth/master/admin/add`;
        method = "POST";
      }
      if (isLastStep) {
        await apiAdminConfig
          .request({ url: url, method: method, data: values })
          .then((response) => {
            if (response?.status === 200) {
              navigate(-1);
              snackbar({
                message: response.data.message,
                severity: "success",
              });
              formik.resetForm();
            } else {
              snackbar({
                message: response.data.message,
                severity: "error",
              });
            }
          })
          .catch((error) => {
            const { response } = error;
            if (response.status === 422) {
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
                severity: "success",
              });
            }
          });
      } else {
        setValue(value + 1);
      }
    },
  });

  const bindData = async () => {
    await apiAdminConfig
      .get(`api/auth/master/admin/edit/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data && response?.data?.view_data) {
            let newData = response?.data?.view_data;
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], newData[key]);
            }
          }
        }
      });
  };

  React.useEffect(() => {
    if (id && id !== "create") {
      bindData(id);
    }
  }, [id]);

  const tabs = [
    {
      title: "Basic",
      fields: [
        "mobile",
        "password",
        "password_confirmation",
        "user_name",
        "email",
      ],
      component: (
        <>
          <Row className="mb-3 g-4">
            <Col xs={12} md={6} lg={6}>
              <Form.Group style={{ textAlign: "left" }} controlId="name">
                <Stack direction="row" spacing={1.5} mb={1} alignItems="center">
                  {/* <Person fontSize="small" color="primary" /> */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    Sub Admin Name
                  </Typography>
                </Stack>
                <Form.Control
                  type="text"
                  value={formik.values.user_name}
                  name="user_name"
                  onChange={formik.handleChange}
                  placeholder="Name of Subadmin"
                  className="mb-0"
                  isInvalid={
                    formik.touched.user_name && formik.errors.user_name
                  }
                />
                {formik.errors.user_name && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.user_name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>

            <Col xs={12} md={6} lg={6}>
              <Form.Group style={{ textAlign: "left" }} controlId="text">
                <Stack direction="row" spacing={1.5} mb={1} alignItems="center">
                  {/* <LocationOn fontSize="small" color="primary" /> */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    User Email
                  </Typography>
                </Stack>
                <Form.Control
                  type="email"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  placeholder="User Name"
                  className="mb-0"
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <Form.Group style={{ textAlign: "left" }} controlId="mobile">
                <Stack direction="row" spacing={1.5} mb={1} alignItems="center">
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                  >
                    Contact Number
                  </Typography>
                </Stack>
                <Form.Control
                  type="tel"
                  maxLength="11"
                  value={formik.values.mobile}
                  name="mobile"
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue(
                        "mobile",
                        e.target.value.replace(/\D/gm, "")
                      );
                    }
                  }}
                  placeholder="Enter Contact Number"
                  className="mb-0"
                  isInvalid={formik.touched.mobile && formik.errors.mobile}
                />
                {formik.errors.mobile && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.mobile}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            {id === "create" && (
              <>
                <Col xs={12} md={6} lg={6}>
                  <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="license_expiry"
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      mb={1}
                      alignItems="center"
                    >
                      <Lock fontSize="small" color="primary" />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        Password
                      </Typography>
                    </Stack>
                    <PasswordBox
                      fullWidth
                      size="small"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={6}>
                  <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="license_expiry"
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      mb={1}
                      alignItems="center"
                    >
                      <Lock fontSize="small" color="primary" />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        Confirm Password
                      </Typography>
                    </Stack>
                    <PasswordBox
                      fullWidth
                      size="small"
                      name="password_confirmation"
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.password_confirmation &&
                        formik.errors.password_confirmation
                      }
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
        </>
      ),
    },
    {
      title: "Permissions",
      fields: ["menus"],
      component: (
        <>
          <Box mb={0.6}>
            <RolePermission formik={formik} permissions={navConfigMenu} />
          </Box>
        </>
      ),
    },
  ];

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
                mb={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{ fontSize: "30px", fontWeight: 500 }}
                  >
                    {id !== "create" ? "Edit Sub Admin" : "Add Sub Admin"}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      navigate(`/master/sub-admin/list`);
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
              <Box>
                <Form onSubmit={formik.handleSubmit}>
                  <ScrollableTabs tabs={tabs} formik={formik} />

                  {/* <div style={{ textAlign: "right" }}>
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
                        Submit
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
                  </div> */}
                </Form>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

class AddEditSubAdmin extends Component {
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

export default AddEditSubAdmin;
