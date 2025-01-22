import React, { Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import DescriptionIcon from "@mui/icons-material/Description";
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
  Mail,
  Person,
  PhoneAndroid,
} from "@mui/icons-material";
import moment from "moment";

const Contant = () => {
  let navigate = useNavigate();
  let { routeName, id } = useParams();
  const snackbar = useSnackbar();

  const [loader, setLoader] = useState(false);

  const plan = [
    {
      value: "1",
      label: "1 Month",
    },
    {
      value: "2",
      label: "2 Month",
    },
    {
      value: "3",
      label: "3 Month",
    },
    {
      value: "4",
      label: "4 Month",
    },
    {
      value: "5",
      label: "5 Month",
    },
    {
      value: "6",
      label: "6 Month",
    },
    {
      value: "7",
      label: "7 Month",
    },
    {
      value: "8",
      label: "8 Month",
    },
    {
      value: "9",
      label: "9 Month",
    },
    {
      value: "10",
      label: "10 Month",
    },
    {
      value: "11",
      label: "11 Month",
    },
    {
      value: "12",
      label: "12 Month",
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      create_for: routeName,
      start_date: "",
      end_date: "",
      posts: "",
      // plan_status: "1",
      duration: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url, method;

      if (id !== "create") {
        url = `/api/auth/master/plan/update/${id}`;
        method = "POST";
      } else {
        url = `/api/auth/master/plan/add`;
        method = "POST";
      }

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
    },
  });

  const bindData = async (id) => {
    await apiAdminConfig
      .get(`/api/auth/master/plan/edit/${id}`)
      .then((response) => {
        if (response && response?.status === 200) {
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
                    sx={{
                      fontSize: "30px",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {id !== "create"
                      ? `Edit ${routeName} Subscription`
                      : `Add ${routeName} Subscriptionkk`}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      navigate(`/master/subscription/subscriptions`);
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
                    <Col xs={12} md={6} lg={6}>
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
                            Plan Name m
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="text"
                          value={formik.values.name}
                          name="name"
                          onChange={formik.handleChange}
                          placeholder="Enter Plan Name"
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
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="price"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <AttachMoneyIcon fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Plan Price
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="text"
                          value={formik.values.price}
                          name="price"
                          // maxLength={6}
                          onChange={(e) => {
                            formik.setFieldValue(
                              `price`,
                              e.target.value.replace(/\D/gm, "")
                            );
                          }}
                          placeholder="Enter Plan Price"
                          className="mb-0"
                          isInvalid={
                            formik.touched.price && formik.errors.price
                          }
                        />
                        {formik.errors.price && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.price}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="PlanDuration"
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          mb={1}
                          alignItems="center"
                        >
                          <DescriptionIcon fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Plan Duration
                          </Typography>
                        </Stack>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.duration}
                          onChange={(e) => {
                            if (e.target.value) {
                              formik.setFieldValue("duration", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.duration && formik.errors.duration
                          }
                        >
                          <option value="0">Choose Duration</option>
                          {plan.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.duration && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.duration}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    {routeName === "customer" && (
                      <Col xs={12} md={12} lg={12}>
                        <Form.Group
                          style={{ textAlign: "left" }}
                          controlId="JobPosting"
                        >
                          <Stack
                            direction="row"
                            spacing={1.5}
                            mb={1}
                            alignItems="center"
                          >
                            <DescriptionIcon fontSize="small" color="primary" />
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 700,
                              }}
                            >
                              Job Posting
                            </Typography>
                          </Stack>
                          <Form.Control
                            type="text"
                            value={formik.values.posts}
                            name="posts"
                            onChange={formik.handleChange}
                            placeholder="Enter number of job posting"
                            className="mb-0"
                            isInvalid={
                              formik.touched.posts && formik.errors.posts
                            }
                          />
                          {formik.errors.posts && (
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.posts}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    )}
                    <Col xs={12} md={12} lg={12}>
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
                          <DescriptionIcon fontSize="small" color="primary" />
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 700,
                            }}
                          >
                            Plan Description
                          </Typography>
                        </Stack>
                        <Form.Control
                          type="text"
                          value={formik.values.description}
                          name="description"
                          onChange={formik.handleChange}
                          placeholder="Enter Plan Description"
                          className="mb-0"
                          as="textarea"
                          rows={3}
                          isInvalid={
                            formik.touched.description &&
                            formik.errors.description
                          }
                        />
                        {formik.errors.description && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
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

class AddSubscription extends Component {
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

export default AddSubscription;
