import React, { Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import { BsX } from "react-icons/bs";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import FastRewind from "@mui/icons-material/FastRewind";
import {
  AccountBox,
  AccountCircle,
  Apartment,
  Cached,
  CalendarToday,
  CheckCircle,
  LocationOn,
  Mail,
  Person,
  PhoneAndroid,
} from "@mui/icons-material";
import moment from "moment";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [clinics, setClinics] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    // You can perform any additional logic here before making an API call, if needed.
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const getClinics = async () => {
    // await apiAdminConfig.get('asset').then((response) => {
    //   if (response.status) {
    //     let clinicsData = []
    //     response?.data && response?.data?.data.forEach((element) => {
    //       clinicsData.push({
    //         clinicName: element?.clinicName,
    //         _id: element?._id,
    //       })
    //     })
    //     setClinics(clinicsData)
    //   }
    // })
  };

  React.useEffect(() => {
    getClinics();
  }, []);

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_type: "customer",
      mobile: "",
      plan_start_date: "",
      plan_end_date: "",
      user_password: "123345678",
      license_expiry: "",
      customer_pin: "123456",
      address: "",
      city: "",
      zip_code: "",
      status: "",
      working_for: "admin",
      email: "",
      profile_img: "",
      profile_img_url: "",
    },
    validate: (values) => {
      const errors = {};
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
      if (!values.zip_code) {
        errors.zip_code = "Pincode is required";
      } else if (!/^[a-zA-Z0-9]{5,8}$/.test(values.zip_code)) {
        errors.zip_code = "Please enter valid pincode";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let formData = new FormData(); //formdata object
      formData.append("user_name", values?.user_name);
      formData.append("profile_img", values?.profile_img);
      formData.append("user_type", values?.user_type);
      formData.append("mobile", values?.mobile);
      formData.append("plan_start_date", values?.plan_start_date);
      formData.append("plan_end_date", values?.plan_end_date);
      formData.append("user_password", values?.user_password);
      formData.append("license_expiry", values?.license_expiry);
      formData.append("address", values?.address);
      formData.append("customer_pin", values?.customer_pin);
      formData.append("city", values?.city);
      formData.append("zip_code", values?.zip_code);
      formData.append("status", values?.status);
      formData.append("working_for", values?.working_for);
      formData.append("email", values?.email);
      await apiAdminConfig
        .post(`/api/auth/master/customer/update/${id}`, formData, { setErrors })
        .then((response) => {
          console.log("response?.status", response?.status);
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
            for (const [key, value] of Object.entries(values)) {
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
    },
  });

  const bindData = async () => {
    await apiAdminConfig
      .get(`api/auth/master/customer/edit/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data) {
            let newData = response?.data?.view_data[0];
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], newData[key]);
            }
            formik.setFieldValue(
              "profile_img_url",
              `${newData.base_url}${newData?.profile_img}`
            );
          }
        }
      });
  };

  React.useEffect(() => {
    if (id) {
      bindData(id);
    }
  }, [id]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
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
                  Edit Customer
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    navigate(`/master/customer/customers`);
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
                <Row className="mb-3 g-4">
                  <Col xs={12} md={6} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="driverName"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <Person fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Customer Name
                        </Typography>
                      </Stack>
                      <Form.Control
                        type="text"
                        value={formik.values.user_name}
                        name="user_name"
                        onChange={formik.handleChange}
                        placeholder="Enter Customer Name"
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
                  <Col xs={12} md={6} lg={4}>
                    <Form.Group style={{ textAlign: "left" }} controlId="email">
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <Mail fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Email
                        </Typography>
                      </Stack>
                      <Form.Control
                        disabled={true}
                        type="email"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        placeholder="Enter Email"
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

                  <Col xs={12} md={6} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="user_contact"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <PhoneAndroid fontSize="small" color="primary" />
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
                        disabled={true}
                        type="tel"
                        maxLength="11"
                        value={formik.values.mobile}
                        name="mobile"
                        onChange={formik.handleChange}
                        placeholder="Enter Contact Number"
                        className="mb-0"
                        isInvalid={
                          formik.touched.mobile && formik.errors.mobile
                        }
                      />
                      {formik.errors.mobile && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.mobile}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  {/* <Col xs={12} md={4} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="plan_start_date"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <CalendarToday fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Plan Start Date
                        </Typography>
                      </Stack>
                      <Form.Control
                        type="date"
                        name="plan_start_date"
                        max={moment().format("YYYY-MM-DD")}
                        value={formik.values.plan_start_date}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "plan_start_date",
                            e.target.value
                          )
                        }
                        placeholder="Enter"
                        className="mb-0"
                        isInvalid={
                          formik.touched.plan_start_date &&
                          formik.errors.plan_start_date
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.plan_start_date}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="plan_end_date"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <CalendarToday fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Plan End Date
                        </Typography>
                      </Stack>
                      <Form.Control
                        type="date"
                        name="plan_end_date"
                        max={moment().format("YYYY-MM-DD")}
                        value={formik.values.plan_end_date}
                        onChange={(e) =>
                          formik.setFieldValue("plan_end_date", e.target.value)
                        }
                        placeholder="Enter"
                        className="mb-0"
                        isInvalid={
                          formik.touched.plan_start_date &&
                          formik.errors.plan_start_date
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.plan_start_date}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col> */}
                
                  <Col xs={12} md={6} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="address"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <LocationOn fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Address
                        </Typography>
                      </Stack>
                      <Form.Control
                        type="text"
                        value={formik.values.address}
                        name="address"
                        onChange={formik.handleChange}
                        placeholder="Enter Address"
                        className="mb-0"
                        isInvalid={
                          formik.touched.address && formik.errors.address
                        }
                      />
                      {formik.errors.address && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.address}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} lg={4}>
                    <Form.Group style={{ textAlign: "left" }} controlId="City">
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <LocationOn fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          City
                        </Typography>
                      </Stack>
                      <Form.Control
                        type="text"
                        value={formik.values.city}
                        name="city"
                        onChange={formik.handleChange}
                        placeholder="Enter City Name"
                        className="mb-0"
                        isInvalid={formik.touched.city && formik.errors.city}
                      />
                      {formik.errors.city && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.city}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="Pin/Zip Code"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <LocationOn fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Pin/Zip Codem
                        </Typography>
                      </Stack>
                      <Form.Control
                        type="text"
                        value={formik.values.zip_code}
                        name="zip_code"
                        maxLength={8}
                        onChange={(e) => {
                          const sanitizedValue = e.target.value.replace(
                            /\W/g,
                            ""
                          );
                          const limitedValue = sanitizedValue.slice(0, 8); // Limit to a maximum of 8 characters
                          if (/^[a-zA-Z0-9]{5,8}$/.test(limitedValue)) {
                            formik.setFieldValue("zip_code", limitedValue);
                          }
                        }}
                        placeholder="Enter Pincode"
                        className="mb-0"
                        isInvalid={
                          formik.touched.zip_code && formik.errors.zip_code
                        }
                      />
                      {formik.errors.zip_code && (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.zip_code}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={4} lg={4}>
                    <Form.Group
                      style={{ textAlign: "left" }}
                      controlId="profile"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        mb={1}
                        alignItems="center"
                      >
                        <LocationOn fontSize="small" color="primary" />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                          }}
                        >
                          Profile Photo
                        </Typography>
                      </Stack>

                      {!formik.values.profile_img && (
                        <Form.Control
                          id="fileInput"
                          name="profile_img"
                          type="file"
                          value={""}
                          accept=".png, .jpg, .jpeg"
                          className="mb-0"
                          onChange={(e) => {
                            formik.setFieldValue(
                              "profile_img",
                              e.target.files[0]
                            );
                            formik.setFieldValue(
                              "profile_img_url",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          isInvalid={
                            formik.touched.profile_img &&
                            formik.errors.profile_img
                          }
                        />
                      )}
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.profile_img}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {formik.values.profile_img && (
                      <Box sx={{ display: "flex" }}>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Image
                            style={{ margin: "10px" }}
                            src={formik.values.profile_img_url}
                            alt={formik.values.profile_img}
                            width="150"
                            height="150"
                            thumbnail
                          />

                          <Button
                            variant="link"
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "-5px",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() => {
                              formik.setFieldValue("profile_img", "");
                              formik.setFieldValue("profile_img_url", "");
                            }}
                          >
                            <BsX
                              style={{
                                color: "#ff0000",
                                fontSize: "25px",
                                fontWeight: "bold",
                              }}
                            />
                          </Button>
                        </div>
                      </Box>
                    )}
                  </Col>
                </Row>
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
                </div>
              </Form>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

class EditDoctor extends Component {
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

export default EditDoctor;
