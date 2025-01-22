import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import QuillComponent from "../../../Components/reactquill/QuillComponent";
import { Box } from "@mui/material";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
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

  const formik = useFormik({
    initialValues: {
      assigned_clinic: [],
      doctorName: "",
      email: "",
      departmentName: "",
      phoneNo: "",
      state: "",
      city: "",
      pincode: "",
      address: "",
      about: "",
      qualification: "",
      consultationfee: "",
      image: "",
      signature: "",
      addDoctorAnnotation: false,
      is_admin: true,
      experience: 0,
      licenseNo: "",
      metaTitle: "",
      metaDescription: "",
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
      if (!values.phoneNo) {
        errors.phoneNo = "Phone is required";
      } else if (!/^[0-9]{10}$/.test(values.phoneNo)) {
        errors.phoneNo = "Please enter valid number";
      }
      if (!values.pincode) {
        errors.pincode = "Pincode is required";
      } else if (!/^[0-9]{6}$/.test(values.pincode)) {
        errors.pincode = "Please enter valid pincode";
      }
      if (!values.experience) {
        errors.experience = "Experience is required";
      } else if (!/^[0-9]*$/.test(values.experience)) {
        errors.experience = "Please enter valid number";
      }
      if (!values.consultationfee) {
        errors.consultationfee = "consultationfee is required";
      } else if (!/^[0-9]*$/.test(values.consultationfee)) {
        errors.consultationfee = "Please enter a valid amount";
      }
      if (!values.licenseNo) {
        errors.licenseNo = "Licence Number is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      // console.log(values);
      // delete values.turndayoff;
      // await apiAdminConfig
      //   .put(`doctor/${id}`, values)
      //   .then((response) => {
      //     if (response && response?.status === 200) {
      //       setLoader(false);
      //       snackbar({
      //         message: "Doctor Updated Successfully.",
      //         severity: "success",
      //       });
      //       setTimeout(() => {
      //         navigate("/master/driver", { replace: true });
      //       }, 1000);
      //     }
      //   })
      //   .catch((error) => {
      //     const { response } = error;
      //     if (response?.data?.status === 406) {
      //       if (response.data.message.toLowerCase().split(" ")[0] === "phone") {
      //         setErrors({ phoneNo: response.data.message });
      //       }
      //       if (response.data.message.toLowerCase().split(" ")[0] === "email") {
      //         setErrors({ email: response.data.message });
      //       }
      //     }
      //   });
    },
  });

  // get DeptName
  const fetchDeptName = async () => {
    // await apiAdminConfig
    //   .post(`getDeptName`)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       let data = response.data.data;
    //       let arr = [];
    //       for (let item of data) {
    //         arr.push({ value: item, label: item });
    //       }
    //       setOptions(arr);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  // get state list
  const fetchState = async () => {
    // await apiAdminConfig
    //   .post("getState")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       let data = response.data.data;
    //       let arr = [];
    //       for (let item of data) {
    //         arr.push({ value: item, label: item });
    //       }
    //       setStatelist(arr);
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
  };

  const fetchCity = async (value) => {
    // await apiAdminConfig
    //   .post("getCity", { state: value })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       let data = response.data.data;
    //       let arr = [];
    //       for (let item of data) {
    //         arr.push({ value: item, label: item });
    //       }
    //       setCitylist(arr);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const fetchDoctor = async (_id) => {
    // setLoader(false);
    // await apiAdminConfig
    //   .get(`doctor/${_id}`)
    //   .then((response) => {
    //     if (response.status) {
    //       let resp = response.data.data[0];
    //       for (const [key, value] of Object.entries(resp)) {
    //         if (key === "contactNumber") {
    //           formik.setFieldValue(`phoneNo`, value);
    //         } else if (key === "specialization") {
    //           formik.setFieldValue(`departmentName`, value);
    //         } else if (key === "state") {
    //           fetchCity(value);
    //           formik.setFieldValue(`state`, value);
    //         } else if (key === "profile_picture") {
    //           formik.setFieldValue(`image`, value);
    //         } else {
    //           formik.setFieldValue(`${key}`, value);
    //         }
    //       }
    //       setLoader(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  // useEffect(() => {
  //   fetchDeptName();
  //   fetchState();
  //   fetchDoctor(id);
  // }, []);

  const fileUpload = async (event) => {
    // let body = { file: event.target.files[0] };
    // await apiAdminConfig
    //   .post(
    //     `doctorImageUpload/${id}`,
    //     { ...body },
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.status === 200) {
    //       formik.setFieldValue(
    //         `${event.target.name}`,
    //         response.data.profile_picture
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Edit Privacy Policy</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/privacy`);
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
                  <Box component={Row} sx={{ gap: "10px", mb: 3 }}>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="doctorName"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.doctorName}
                          name="doctorName"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={
                            formik.touched.doctorName &&
                            formik.errors.doctorName
                          }
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.doctorName && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.doctorName}
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
                          value={formik.values.metaTitle}
                          name="metaTitle"
                          onChange={formik.handleChange}
                          placeholder="Enter Meta Tag"
                          className="mb-0"
                          isInvalid={
                            formik.touched.metaTitle && formik.errors.metaTitle
                          }
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.metaTitle && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.metaTitle}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="signature"
                      >
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.metaDescription}
                          name="metaDescription"
                          onChange={formik.handleChange}
                          placeholder="Enter Meta Discription"
                          className="mb-0"
                          isInvalid={
                            formik.touched.metaDescription &&
                            formik.errors.metaDescription
                          }
                          as="textarea"
                          rows={3}
                        />
                        {formik.errors.metaDescription && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.metaDescription}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="about"
                      >
                        <Form.Label>Description</Form.Label>
                        <QuillComponent
                          change={(val) => {
                            formik.setFieldValue("about", val);
                          }}
                        />
                      </Form.Group>
                    </Col>
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
