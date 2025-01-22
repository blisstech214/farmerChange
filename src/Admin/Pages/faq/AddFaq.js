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
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
} from "@mui/material";
import { find, reject } from "lodash";
import { Close } from "@mui/icons-material";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [clinics, setClinics] = React.useState([]);

  const defaultValues = {
    question: "",
    answer: "",
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

  const bindData = async () => {
    await apiAdminConfig
      .get(`/api/auth/master/page/edit/faq`)
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
      title: "",
      body: "",
      status: "1",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
      slug: "faq",
      faqs: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "title is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      await apiAdminConfig
        .post("/api/auth/master/page/update/faq", values)
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

  const addFaq = () => {
    formik.setFieldValue("faqs", [
      ...(formik.values.faqs || []),
      defaultValues,
    ]);
  };

  const removeFaq = (index) => {
    if (formik?.values?.faqs) {
      const data = formik.values.faqs.splice(index, 1);
      formik.setFieldValue("faqs", reject(formik.values.faqs, data));
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add FAQ</h3>
            </Col>
            <Col md={4}></Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2} mb={4}>
                    <Grid item md={12} xs={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="doctorName"
                      >
                        <Form.Label>Title {"(FAQ)"}</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.title}
                          name="title"
                          onChange={formik.handleChange}
                          placeholder="Title (FAQ)"
                          className="mb-0"
                          isInvalid={
                            formik.touched.title && formik.errors.title
                          }
                        />
                        {formik.errors.title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="email"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="email"
                          value={formik.values.body}
                          name="body"
                          onChange={formik.handleChange}
                          placeholder="Enter Description"
                          className="mb-0"
                          isInvalid={formik.touched.body && formik.errors.body}
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.body && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.body}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Grid>

                    <Grid item md={6} sm={12} xs={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="signature"
                      >
                        <Form.Label>Meta Tags</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.meta_title}
                          name="meta_title"
                          onChange={formik.handleChange}
                          placeholder="Enter Meta Tag"
                          className="mb-0"
                          isInvalid={
                            formik.touched.meta_title &&
                            formik.errors.meta_title
                          }
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.meta_title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.meta_title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Grid>

                    <Grid item md={6} sm={12} xs={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="signature"
                      >
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.meta_description}
                          name="meta_description"
                          onChange={formik.handleChange}
                          placeholder="Enter Meta Discription"
                          className="mb-0"
                          isInvalid={
                            formik.touched.meta_description &&
                            formik.errors.meta_description
                          }
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.meta_description && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.meta_description}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Grid>
                  </Grid>

                  <Box>
                    <Divider
                      sx={{
                        my: 4,
                        borderColor: (theme) => theme.palette.grey[600],
                      }}
                    />
                    <div>
                      {formik?.values?.faqs &&
                        formik?.values?.faqs?.length > 0 &&
                        formik.values.faqs.map((item, index) => (
                          <Box mt={1} key={index}>
                            <Card>
                              <CardHeader
                                subheader={`Faq-${index + 1}`}
                                action={
                                  <IconButton onClick={() => removeFaq(index)}>
                                    <Close />
                                  </IconButton>
                                }
                              />
                              <CardContent>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <Form.Group
                                      style={{ textAlign: "left" }}
                                      controlId="doctorName"
                                    >
                                      <Form.Label>Question</Form.Label>
                                      <Form.Control
                                        type="text"
                                        value={item?.question}
                                        name={`faqs[${index}].question`}
                                        onChange={formik.handleChange}
                                        placeholder="Question"
                                        className="mb-0"
                                        isInvalid={
                                          formik.touched.question &&
                                          formik.errors.question
                                        }
                                      />
                                      {formik.errors.question && (
                                        <Form.Control.Feedback type="invalid">
                                          {formik.errors.question}
                                        </Form.Control.Feedback>
                                      )}
                                    </Form.Group>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Form.Group
                                      style={{ textAlign: "left" }}
                                      controlId="answer"
                                    >
                                      <Form.Label>Answer</Form.Label>
                                      <Form.Control
                                        type="text"
                                        value={item?.answer}
                                        name={`faqs[${index}].answer`}
                                        onChange={formik.handleChange}
                                        placeholder="Enter Answer"
                                        className="mb-0"
                                        isInvalid={
                                          formik.touched.answer &&
                                          formik.errors.answer
                                        }
                                        as="textarea"
                                        rows={3}
                                      />
                                      {formik.errors.answer && (
                                        <Form.Control.Feedback type="invalid">
                                          {formik.errors.answer}
                                        </Form.Control.Feedback>
                                      )}
                                    </Form.Group>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Box>
                        ))}

                      <Box my={2} textAlign="right">
                        <Button variant="contained" onClick={() => addFaq()}>
                          Add Faq
                        </Button>
                      </Box>
                    </div>
                    <Divider
                      sx={{
                        my: 4,
                        borderColor: (theme) => theme.palette.grey[600],
                      }}
                    />
                  </Box>

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
                </Form>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class AddRides extends Component {
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

export default AddRides;
