import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../../siginin/admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import QuillComponent from "../../../Components/reactquill/QuillComponent";
import { MultiSelectBox } from "../../../Components/form";
import { BsTrashFill, BsX } from "react-icons/bs";

const Contant = () => {
  let navigate = useNavigate();
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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      status: "1",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
      image: "",
      image_url: "",
    },
    validate: (values) => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let formData = new FormData(); //formdata object

      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("category", values?.category);
      formData.append("status", values?.status);
      formData.append("meta_title", values?.meta_title);
      formData.append("meta_keywords", values?.meta_keywords);
      formData.append("meta_description", values?.meta_description);
      formData.append("image", values?.image);

      console.log("newss");
      // console.log("formData", formData);
      await apiAdminConfig
        .post("/api/auth/master/blog/add", formData, { setErrors })
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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add Blog</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  navigate(`/master/blog/blogs`);
                }}
                style={{
                  borderColor: "#FF7534",
                  color: "#FF7534",
                }}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3" style={{ rowGap: "10px" }}>
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="title"
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
                            formik.touched.title && formik.errors.title
                          }
                        />
                        {formik.errors.title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="category"
                      >
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="category"
                          value={formik.values.category}
                          name="category"
                          onChange={formik.handleChange}
                          placeholder="Enter Category"
                          className="mb-0"
                          isInvalid={
                            formik.touched.category && formik.errors.category
                          }
                        />
                        {formik.errors.category && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.category}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="Description"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.description}
                          name="description"
                          onChange={formik.handleChange}
                          placeholder="Enter Description"
                          className="mb-0"
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
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="profile"
                      >
                        <Form.Label>Feature Image</Form.Label>

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
                            style={{ width: "100%" }}
                          />
                        )}

                        <Form.Control.Feedback type="invalid">
                          {formik.errors.image}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {formik.values.image_url && (
                        <div style={{ width: "100%", textAlign: "left" }}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <Image
                              style={{ margin: "10px" }}
                              src={formik.values.image_url}
                              alt={formik.values.image.name}
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
                        </div>
                      )}
                    </Col>
                  
                    <Col xs={12} md={6} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="meta_title"
                      >
                        <Form.Label>Meta Title</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={1}
                          value={formik.values.meta_title}
                          name="meta_title"
                          onChange={formik.handleChange}
                          placeholder="Enter meta title"
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
                    <Col xs={12} md={6} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="meta_description"
                      >
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={2}
                          value={formik.values.meta_description}
                          name="meta_description"
                          onChange={formik.handleChange}
                          placeholder="Enter meta description"
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
                  </Row>
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

class AddCustomer extends Component {
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

export default AddCustomer;
