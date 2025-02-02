import React, { Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Sidebar from "../../../Admin/SideNav/sideBar";
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
  Rating,
} from "@mui/material";
import FastRewind from "@mui/icons-material/FastRewind";
import {
  AccountBox,
  AccountCircle,
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
  const [clinics, setClinics] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [licenceFile, setLicenceFile] = useState(null);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      text: "",
      rating: "",
      image: "",
      image_url: "",
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url, method;

      if (id !== "create") {
        url = `/api/auth/master/testimonial/update/${id}`;
        method = "POST";
      } else {
        url = `/api/auth/master/testimonial/add`;
        method = "POST";
      }
      let formData = new FormData();

      formData.append("name", values?.name);
      formData.append("text", values?.text);
      formData.append("rating", values?.rating);
      formData.append("image", values?.image);

      await apiAdminConfig
        .request({ url: url, method: method, data: formData })
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
    },
  });
  const bindData = async () => {
    await apiAdminConfig
      .get(`api/auth/master/testimonial/view/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.view_data) {
            let newData = response?.data?.view_data;
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], newData[key]);
            }
            formik.setFieldValue(
              "image_url",
              `${newData.base_url}${newData?.image}`
            );

            // formik.setFieldValue(
            //   "image_url",
            //   `${data?.base_url}${data?.image}`
            // );
            // formik.setFieldValue(
            //   "driving_image_url",
            //   `${data?.base_url}${data?.driving_license_front}`
            // );
          }
        }
      });
  };

  React.useEffect(() => {
    if (id && id !== "create") {
      bindData(id);
    }
  }, [id]);

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
                    {id !== "create" ? "Edit Testimonial" : "Add Testimonial"}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      navigate(`/master/review/review-ratings`);
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
                        controlId="name"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          {/* <Person fontSize="small" color="primary" /> */}
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            User Name
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="text"
                          value={formik.values.name}
                          name="name"
                          onChange={formik.handleChange}
                          placeholder="Enter User Name"
                          className="mb-0"
                          isInvalid={formik.touched.name && formik.errors.name}
                        />
                        {formik.errors.name && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="text"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          {/* <LocationOn fontSize="small" color="primary" /> */}
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Review
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="text"
                          value={formik.values.text}
                          name="text"
                          onChange={formik.handleChange}
                          placeholder="Write Review"
                          className="mb-0"
                          isInvalid={formik.touched.text && formik.errors.text}
                        />
                        {formik.errors.text && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.text}
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
                          {/* <LocationOn fontSize="small" color="primary" /> */}
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Rating
                          </Typography>
                        </Stack>
                        <Rating
                          name="simple-controlled"
                          value={formik.values.rating}
                          // onChange={formik.handleChange}
                          onChange={(event, newValue) => {
                            formik.setFieldValue("rating", newValue);
                          }}
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: (theme) => theme.palette.primary.main,
                            },
                          }}
                        />
                        {/* <Form.Control
                          type="text"
                          value={formik.values.rating}
                          name="rating"
                          onChange={formik.handleChange}
                          placeholder="Enter rating (Between 1-5)"
                          className="mb-0"
                          isInvalid={
                            formik.touched.rating &&
                            formik.errors.rating
                          }
                        />
                        {formik.errors.rating && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.rating}
                          </Form.Control.Feedback>
                        )} */}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="image"
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
                            User Photo
                          </Typography>
                        </Stack>
                        {!formik.values.image && (
                          <Form.Control
                            id="fileInput"
                            name="image"
                            value={""}
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            className="mb-0"
                            onChange={(e) => {
                              formik.setFieldValue("image", e.target.files[0]);
                              formik.setFieldValue(
                                "image_url",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                            isInvalid={
                              formik.touched.image && formik.errors.image
                            }
                          />
                        )}
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.image}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.image_url && (
                        <Box sx={{ display: "flex" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.image_url}
                              alt={formik.values.image}
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
                                formik.setFieldValue("image", "");
                                formik.setFieldValue("image_url", "");
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

class AddEditTestimonials extends Component {
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

export default AddEditTestimonials;
