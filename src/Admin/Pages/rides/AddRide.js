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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import QuillComponent from "../../../Components/reactquill/QuillComponent";
import { MultiSelectBox } from "../../../Components/form";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import {
  Autocomplete,
  Box,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import Timeselect from "../../../Components/Datepicker/Timeselect";
import { TextBox } from "../../../Components/muiForm";

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

  const formik = useFormik({
    initialValues: {
      doctorName: "",
      email: "",
      departmentName: "",
      phoneNo: "",
      state: "",
      assigned_clinic: [],
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
      if (!values.experience) {
        errors.experience = "Experience is required";
      } else if (!/^[0-9]*$/.test(values.experience)) {
        errors.experience = "Please enter valid number";
      }
      if (!values.pincode) {
        errors.pincode = "Pincode is required";
      } else if (!/^[0-9]{6}$/.test(values.pincode)) {
        errors.pincode = "Please enter valid pincode";
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
      // await apiAdminConfig
      //   .post("/addDoctor", values)
      //   .then((response) => {
      //     if (response?.data?.success) {
      //       setLoader(false);
      //       snackbar({
      //         message: response.data.message,
      //         severity: "success",
      //       });
      //       formik.resetForm();
      //     } else {
      //       snackbar({
      //         message: response.data.message,
      //         severity: "error",
      //       });
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

  useEffect(() => {
    fetchDeptName();
    fetchState();
  }, []);

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
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add Job</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  navigate(`/master/ride/rides`);
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
              <Stack spacing={4}>
                <Box>
                  <CardContent>
                    <Grid container spacing={1} justifyContent="left">
                      <Grid item md={12}>
                        <Box>
                          <Typography textAlign="left">Job Title</Typography>
                          <TextBox
                            fullWidth
                            placeholder={"Enter Job Title"}
                            size={"small"}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={12}>
                        <Box>
                          <Typography textAlign="left">
                            Pick-Up Address
                          </Typography>
                          <TextBox
                            fullWidth
                            placeholder={"Drop-Out Location"}
                            size={"small"}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Typography textAlign="left">Pick-Up Date</Typography>
                          <TextBox fullWidth type="date" size={"small"} />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Typography textAlign="left">Pick-Up Time</Typography>
                          <TextBox
                            fullWidth
                            type="time"
                            placeholder="Drop-Out Location"
                            size={"small"}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={12}>
                        <Box>
                          <Typography textAlign="left">
                            Delivery Address
                          </Typography>
                          <TextBox
                            fullWidth
                            placeholder="Drop-Out Location"
                            size={"small"}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Typography textAlign="left">
                            Delivery Date
                          </Typography>
                          <TextBox fullWidth type="date" size={"small"} />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Typography textAlign="left">
                            Delivery Time
                          </Typography>
                          <TextBox
                            fullWidth
                            type="time"
                            placeholder="Drop-Out Location"
                            size={"small"}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Autocomplete
                            sx={{ mb: 0 }}
                            size="small"
                            fullWidth
                            options={[]}
                            name={`Material`}
                            value={formik?.values?.otp}
                            onChange={formik.handleChange}
                            error={formik.touched.otp && formik.errors.otp}
                            helperText={formik.touched.otp && formik.errors.otp}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Choose Material"
                                InputProps={{
                                  ...params.InputProps,
                                }}
                              />
                            )}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <TextBox
                            fullWidth
                            placeholder="Enter Size Eg: l x w x h Inch"
                            size={"small"}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Typography textAlign="left">
                            Product Image
                          </Typography>
                          <TextBox fullWidth type="file" size={"small"} />
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <Typography textAlign="left">
                            Vehicle Requirement
                          </Typography>
                          <Autocomplete
                            sx={{ mb: 0 }}
                            size="small"
                            fullWidth
                            options={[]}
                            name={`Vehicle`}
                            value={formik?.values?.otp}
                            onChange={formik.handleChange}
                            error={formik.touched.otp && formik.errors.otp}
                            helperText={formik.touched.otp && formik.errors.otp}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Choose Vehicle Type"
                                InputProps={{
                                  ...params.InputProps,
                                }}
                              />
                            )}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={12}>
                        <Box>
                          <TextBox
                            fullWidth
                            placeholder="Important Note:"
                            size={"small"}
                            multiline={true}
                            rows={5}
                          />
                        </Box>
                      </Grid>
                    </Grid>
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
                  </CardContent>
                </Box>
              </Stack>
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
