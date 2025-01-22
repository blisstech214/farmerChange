import React, { Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, useFormik } from "formik";
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
import FastRewind from "@mui/icons-material/FastRewind";
import {
  AccountBox,
  AccountCircle,
  Cached,
  CalendarToday,
  CheckCircle,
  LocationOn,
  Lock,
  Mail,
  Person,
  PhoneAndroid,
} from "@mui/icons-material";
import moment from "moment";
import { PasswordBox } from "../../../Components/form";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const snackbar = useSnackbar();
  const [userType, setUserType] = useState([
    {
      value: "0",
      label: "Choose User Type",
    },
    {
      value: "driver",
      label: "Individual",
    },
    {
      value: "company",
      label: "Company",
    },
  ]);
  const [registerType, setRegisterType] = useState([
    {
      value: "0",
      label: "Choose User Type",
    },
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "portal",
      label: "Portal",
    },
  ]);
  const [citylist, setCitylist] = useState([
    {
      value: "city",
      label: "City",
    },
  ]);
  
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [clinics, setClinics] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [licenceFile, setLicenceFile] = useState(null);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);







  const formik = useFormik({
    initialValues: {
      user_name: "",
      driver_type: "individual",
      register_type: "admin",
      mobile: "",
      password: "",
      license_expiry: "",
      address: "",
      city: "",
      zip_code: "",
      status: "",
      working_for: "admin",
      user_type: "driver",
      contact_number: "",
      email: "",
      licence_front: "",
      licence_back: "",
      driving_license_url_front: "",
      driving_license_url_back: "",
      address_proof: "",
      address_proof_url: "",
      insurance_cert: "",
      insurance_cert_url: "",
      transit_cert: "",
      transit_cert_url: "",
      liability_cert: "",
      liability_cert_url: "",
      v5c_cert: "",
      v5c_cert_url: "",
      dvia_cert: "",
      dvia_cert_url: "",
      nationality_cert: "",
      nationality_cert_url: "",
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

      // if (!values.password) {
      //   errors.password = "Password is required";
      // }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let formData = new FormData(); //formdata object

      formData.append("user_name", values?.user_name);
      formData.append("driver_type", values?.driver_type);
      formData.append("user_type", values?.user_type);
      formData.append("register_type", values?.register_type);
      formData.append("mobile", values?.mobile);
      formData.append("plan_start_date", values?.plan_start_date);
      formData.append("plan_end_date", values?.plan_end_date);

      // formData.append("password", values?.password);
      formData.append("license_expiry", values?.license_expiry);
      formData.append("address", values?.address);
      formData.append("city", values?.city);
      formData.append("zip_code", values?.zip_code);
      formData.append("status", values?.status);
      formData.append("working_for", values?.working_for);
      formData.append("contact_number", values?.contact_number);
      formData.append("email", values?.email);
      formData.append("licence_front", values?.licence_front);
      formData.append("licence_back", values?.licence_back);
      formData.append("address_proof", values?.address_proof);
      formData.append("insurance_cert", values?.insurance_cert);
      formData.append("transit_cert", values?.transit_cert);
      formData.append("liability_cert", values?.liability_cert);
      formData.append("v5c_cert", values?.v5c_cert);
      formData.append("dvia_cert", values?.dvia_cert);
      formData.append("nationality_cert", values?.nationality_cert);

      await apiAdminConfig
        .post(`/api/auth/master/driver/update/${id}`, formData)
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
      .get(`api/auth/master/driver/edit/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data?.length > 0) {
            let data = response?.data?.view_data[0];
            for (const [key] of Object.entries(formik.values)) {
              if (key === "license_expiry") {
                formik.setFieldValue(
                  "license_expiry",
                  data?.license_expiry ? moment(data.license_expiry, "DD-MM-YYYY").format("YYYY-MM-DD") : null
                );
              } else {
                formik.setFieldValue(key, data[key]);
              }
            }
            
            formik.setFieldValue(
              "driving_license_url_front",
              `${data?.base_url}${data?.licence_front}`
            );
            formik.setFieldValue(
              "driving_license_url_back",
              `${data?.base_url}${data?.licence_back}`
            );
            formik.setFieldValue(
              "address_proof_url",
              `${data?.base_url}${data?.address_proof}`
            );
            formik.setFieldValue(
              "insurance_cert_url",
              `${data?.base_url}${data?.insurance_cert}`
            );
            formik.setFieldValue(
              "transit_cert_url",
              `${data?.base_url}${data?.transit_cert}`
            );
            formik.setFieldValue(
              "liability_cert_url",
              `${data?.base_url}${data?.liability_cert}`
            );
            formik.setFieldValue(
              "v5c_cert_url",
              `${data?.base_url}${data?.v5c_cert}`
            );
            formik.setFieldValue(
              "dvia_cert_url",
              `${data?.base_url}${data?.dvia_cert}`
            );
            formik.setFieldValue(
              "nationality_cert_url",
              `${data?.base_url}${data?.nationality_cert}`
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

  console.log("formik.values", formik.values);

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
                    Edit Driver
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      navigate(`/master/driver/drivers`);
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
                            Driver Name
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="text"
                          value={formik.values.user_name}
                          name="user_name"
                          onChange={formik.handleChange}
                          placeholder="Enter Driver Name"
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
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="email"
                      >
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
                          isInvalid={
                            formik.touched.email && formik.errors.email
                          }
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
                        controlId="mobile"
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
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="City"
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
                        controlId="pincode"
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
                            Pincode
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

                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="userType"
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
                            User Type
                          </Typography>
                        </Stack>
                        <div>
                          <Form.Select
                            aria-label="Select.."
                            value={formik.values.driver_type}
                            onChange={(e) => {
                              if (e.target.value) {
                                formik.setFieldValue(
                                  "driver_type",
                                  e.target.value
                                );
                                if (e.target.value === "company") {
                                  setShowCompanyDropdown(true);
                                }
                                setShowCompanyDropdown(false);
                              }
                            }}
                            isInvalid={
                              formik.touched.driver_type &&
                              formik.errors.driver_type
                            }
                          >
                            {/* <option value="0">Choose User Type</option> */}
                            {userType.map((el, id) => {
                              return (
                                <option key={id} value={el.value}>
                                  {el.label}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </div>
                        {formik.errors.driver_type && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.driver_type}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="registerType"
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
                            Register Type
                          </Typography>
                        </Stack>
                        <div>
                          <Form.Select
                            aria-label="Select.."
                            value={formik.values.register_type}
                            onChange={(e) => {
                              if (e.target.value) {
                                formik.setFieldValue(
                                  "register_type",
                                  e.target.value
                                );
                              }
                            }}
                            isInvalid={
                              formik.touched.register_type &&
                              formik.errors.register_type
                            }
                          >
                            {/* <option value="0">Choose User Type</option> */}
                            {registerType.map((el, id) => {
                              return (
                                <option key={id} value={el.value}>
                                  {el.label}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </div>
                        {formik.errors.register_type && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.register_type}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
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
                          <CalendarToday fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Licence Date
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="date"
                          name="license_expiry"
                          value={formik.values.license_expiry}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "license_expiry",
                              e.target.value
                            )
                          }
                          placeholder="Enter"
                          className="mb-0"
                          isInvalid={
                            formik.touched.license_expiry &&
                            formik.errors.license_expiry
                          }
                          // max={new Date()}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.license_expiry}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                  
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="license"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountBox fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Driver Licence Front
                          </Typography>
                        </Stack>

                        {!formik.values.licence_front && (
                          <Form.Control
                            id="fileInput1"
                            name="licence_front"
                            type="file"
                            value={""}
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "licence_front",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "driving_license_url_front",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.licence_front &&
                              formik.errors.licence_front
                            }
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.licence_front}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.driving_license_url_front && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.driving_license_url_front}
                              alt={formik.values.licence_front}
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
                                formik.setFieldValue("licence_front", "");
                                formik.setFieldValue(
                                  "driving_license_url_front",
                                  ""
                                );
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="backlicense"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountBox fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Driver Licence Back
                          </Typography>
                        </Stack>

                        {!formik.values.licence_back && (
                          <Form.Control
                            id="fileInput1"
                            name="licence_back"
                            type="file"
                            value={""}
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "licence_back",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "driving_license_url_back",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.licence_back &&
                              formik.errors.licence_back
                            }
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.licence_back}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.driving_license_url_back && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.driving_license_url_back}
                              alt={formik.values.licence_back}
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
                                formik.setFieldValue("licence_back", "");
                                formik.setFieldValue(
                                  "driving_license_url_back",
                                  ""
                                );
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
                    <Col xs={12} md={4} lg={4}>
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
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Address Proof
                          </Typography>
                        </Stack>

                        {!formik.values.address_proof && (
                          <Form.Control
                            id="fileInput"
                            name="address_proof"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "address_proof",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "address_proof_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.address_proof &&
                              formik.errors.address_proof
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.address_proof}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.address_proof_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.address_proof_url}
                              alt={formik.values.address_proof}
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
                                formik.setFieldValue("address_proof", "");
                                formik.setFieldValue("address_proof_url", "");
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="insurance"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Insurance Certificate
                          </Typography>
                        </Stack>

                        {!formik.values.insurance_cert && (
                          <Form.Control
                            id="fileInput"
                            name="insurance_cert"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "insurance_cert",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "insurance_cert_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.insurance_cert &&
                              formik.errors.insurance_cert
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.insurance_cert}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.insurance_cert_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.insurance_cert_url}
                              alt={formik.values.insurance_cert}
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
                                formik.setFieldValue("insurance_cert", "");
                                formik.setFieldValue("insurance_cert_url", "");
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="transit"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Transit Certificate
                          </Typography>
                        </Stack>

                        {!formik.values.transit_cert && (
                          <Form.Control
                            id="fileInput"
                            name="transit_cert"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "transit_cert",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "transit_cert_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.transit_cert &&
                              formik.errors.transit_cert
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.transit_cert}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.transit_cert_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.transit_cert_url}
                              alt={formik.values.transit_cert}
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
                                formik.setFieldValue("transit_cert", "");
                                formik.setFieldValue("transit_cert_url", "");
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="liability"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Public Liability Certificate
                          </Typography>
                        </Stack>

                        {!formik.values.liability_cert && (
                          <Form.Control
                            id="fileInput"
                            name="liability_cert"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "liability_cert",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "liability_cert_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.liability_cert &&
                              formik.errors.liability_cert
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.liability_cert}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.liability_cert_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.liability_cert_url}
                              alt={formik.values.liability_cert}
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
                                formik.setFieldValue("liability_cert", "");
                                formik.setFieldValue("liability_cert_url", "");
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="vc">
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            V5c Certificate
                          </Typography>
                        </Stack>

                        {!formik.values.v5c_cert && (
                          <Form.Control
                            id="fileInput"
                            name="v5c_cert"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "v5c_cert",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "v5c_cert_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.v5c_cert && formik.errors.v5c_cert
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.v5c_cert}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.v5c_cert_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.v5c_cert_url}
                              alt={formik.values.v5c_cert}
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
                                formik.setFieldValue("v5c_cert", "");
                                formik.setFieldValue("v5c_cert_url", "");
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="dvia"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Dvia Certificate
                          </Typography>
                        </Stack>

                        {!formik.values.dvia_cert && (
                          <Form.Control
                            id="fileInput"
                            name="dvia_cert"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "dvia_cert",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "dvia_cert_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.dvia_cert &&
                              formik.errors.dvia_cert
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.dvia_cert}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.dvia_cert_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.dvia_cert_url}
                              alt={formik.values.dvia_cert}
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
                                formik.setFieldValue("dvia_cert", "");
                                formik.setFieldValue("dvia_cert_url", "");
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
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="nationality"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AccountCircle fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Nationality Proof Certificate
                          </Typography>
                        </Stack>

                        {!formik.values.nationality_cert && (
                          <Form.Control
                            id="fileInput"
                            name="nationality_cert"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue(
                                "nationality_cert",
                                e.target.files[0]
                              );
                              formik.setFieldValue(
                                "nationality_cert_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.nationality_cert &&
                              formik.errors.nationality_cert
                            }
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.nationality_cert}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.nationality_cert_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.nationality_cert_url}
                              alt={formik.values.nationality_cert}
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
                                formik.setFieldValue("nationality_cert", "");
                                formik.setFieldValue(
                                  "nationality_cert_url",
                                  ""
                                );
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
        </>
      )}
    </>
  );
};

class EditDriver extends Component {
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

export default EditDriver;
