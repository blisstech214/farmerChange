import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import QuillComponent from "../../../Components/reactquill/QuillComponent";
import { MultiSelectBox } from "../../../Components/form";
import { Box, Stack, Typography,CardContent } from "@mui/material";
import {
  CalendarToday,
  LocationOn,
  Mail,
  Person,
  PhoneAndroid,
} from "@mui/icons-material";
import moment from "moment";
import Contact from "./Contact";
import { find } from "lodash";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [clinics, setClinics] = React.useState([]);

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
  const bindData = async () => {
    await apiAdminConfig
      .get(`/api/auth/master/contact/view`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data) {
            let newData = response?.data?.view_data;
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], newData[key]);
            }

         
          }
        }
      });
  };

  React.useEffect(() => {
    bindData();
  }, []);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
      address: "",
      recover_email: "",
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let formData = new FormData(); //formdata object

      formData.append("mobile", values?.mobile);
      formData.append("email", values?.email);
      formData.append("address", values?.address);
      formData.append("recover_email", values?.recover_email);

      console.log("formData", formData);
      await apiAdminConfig
        .post("/api/auth/master/contact/add", formData, { setErrors })
        .then((response) => {
          if (response?.status === 200) {
            snackbar({
              message: response.data.message,
              severity: "success",
            });
            formik.resetForm();
            bindData();
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
            console.log("response", response.data);
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

            console.log("response", formik.values);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add Contact</h3>
            </Col>
            <Col md={4}></Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
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
                              Call Us
                            </Typography>
                          </Stack>
                          <Form.Control
                            type="text"
                            value={formik.values.mobile || ''}
                            name="mobile"
                            onChange={(e) => {
                            formik.setFieldValue(
                              `mobile`,
                              e.target.value.replace(/\D/gm, "")
                            );
                          }}
                            placeholder="Call Us"
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
                          controlId="recover_email"
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
                              Receiver Recover Email
                            </Typography>
                          </Stack>
                          <Form.Control
                            type="recover_email"
                            value={formik.values.recover_email}
                            name="recover_email"
                            onChange={formik.handleChange}
                            placeholder="Enter Email"
                            className="mb-0"
                            isInvalid={
                              formik.touched.recover_email &&
                              formik.errors.recover_email
                            }
                          />
                          {formik.errors.recover_email && (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.recover_email}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Box mt={8}>
                      <div style={{ textAlign: "right" }}>
                        <Button
                          style={{ background: "#FF7534" }}
                          variant="contained"
                          className="rounded"
                          type="submit"
                        >
                          Submit
                        </Button>{" "}
                        <Button
                          style={{
                            borderColor: "#FF7534",
                            color: "#FF7534",
                          }}
                          variant="outlined"
                          className="rounded"
                          onClick={() => formik.resetForm()}
                        >
                          Reset
                        </Button>
                      </div>
                    </Box>
                  </Form>
                </Box>
              </Card.Body>
            </Card>
          </div>
          <Box>
            <Contact />
          </Box>
        </>
      )}
    </>
  );
};

class AddContact extends Component {
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

export default AddContact;
