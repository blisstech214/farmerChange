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
  }

  React.useEffect(() => {
    getClinics();
  }, [])
  const bindData = async () => {
    await apiAdminConfig.get(`/api/auth/master/page/edit/term-and-conditions`).then((response) => {
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
      slug: "term-and-conditions",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "title is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let formData = new FormData(); //formdata object

      formData.append("title", values?.title);
      formData.append("status", values?.status);
      formData.append("body", values?.body);
      formData.append("meta_title", values?.meta_title);
      formData.append("meta_keywords", values?.meta_keywords);
      formData.append("meta_description", values?.meta_description);

      console.log("formData", formData);
      await apiAdminConfig
        .post("/api/auth/master/page/update/term-and-conditions", formData, { setErrors })
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

 

  const fileUpload = async (event) => {
    let body = { file: event.target.files[0] };
    await apiAdminConfig
      .post(
        "getFileUrl",
        { ...body },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          formik.setFieldValue(`${event.target.name}`, response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={12} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add Terms & Conditions</h3>
            </Col>
            {/* <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/terms`);
                }}
                style={{
                  borderColor: '#FF7534',
                  color: '#FF7534',
                }}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col> */}
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="doctorName"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.title}
                          name="title"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={
                            formik.touched.title &&
                            formik.errors.title
                          }
                        />
                        {formik.errors.title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                   
                    {/* <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="signature"
                      >
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                          name="signature"
                          type="file"
                          className="mb-0"
                          onChange={(e) => {
                            fileUpload(e);
                          }}
                        />
                      </Form.Group>
                      <Image
                        style={{
                          margin: "10px",
                          display: `${formik.values.signature ? "block" : "none"}`,
                        }}
                        src={formik.values.signature}
                        alt={formik.values.signature}
                        width="150"
                        height="150"
                        thumbnail
                      />
                    </Col> */}
                    <Col xs={12} md={12} lg={12}>
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
                        />
                        {formik.errors.meta_description && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.meta_description}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                      
                    </Col>
                    <Col xs={12} md={12} lg={12}>
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
                        />
                        {formik.errors.meta_title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.meta_title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                      
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="body"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.body}
                          name="body"
                          onChange={formik.handleChange}
                          placeholder="Enter Discription"
                          className="mb-0"
                          isInvalid={
                            formik.touched.body &&
                            formik.errors.body
                          }
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.body && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.body}
                          </Form.Control.Feedback>
                        )}
                       
                      </Form.Group>
                    </Col>
                  
                  </Row>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ background: '#FF7534' }}
                      variant="contained"
                      className="rounded"
                      type="submit"
                    >
                      Submit
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: '#FF7534',
                        color: '#FF7534',
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
