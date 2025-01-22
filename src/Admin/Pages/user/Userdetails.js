import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Image from "react-bootstrap/Image";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { apiAdminConfig } from "../../../utils/api";
import { Container, Stack } from "react-bootstrap";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nodata from "../../../Components/nodata/Nodata";
import Table from "react-bootstrap/Table";
// import TablePagination from "../../../Components/Pagination/Pagination";
import { useSnackbar } from "../../../provider/snackbar";
import { Box, CardContent, Grid } from "@mui/material";

const Contant = () => {
  let navigate = useNavigate();

  const tempData = [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "John@gmail.com",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Rahul Doe",
      email: "rahul@gamil.com",
      phone: "1234567890",
    },
  ];

  // for Driver List
  const tablehead = [
    "S/N",
    "Driver Name",
    "Email",
    "Contact No.",
    "Register Type",
    "Total Jobs",
    "Total Earning",
    "Job Status",
  ];

  const driverTempData = [
    {
      id: 1,
      name: "Dr. John Doe",
      email: "John@gamil.com",
      phone: "1234567890",
      registerType: "Manual",
      totalJobs: 10,
      totalEarning: 1000,
      jobStatus: "Active",
    },
    {
      id: 2,
      name: "Rahul Doe",
      email: "Rahul@gamil.com",
      phone: "1234567890",
      registerType: "Manual",
      totalJobs: 10,
      totalEarning: 1000,
      jobStatus: "Active",
    },
  ];

  const snackbar = useSnackbar();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState(tempData);
  const [doc, setDoc] = useState({});
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });

  const fetchdata = async (id) => {
    setLoader(true);
    await apiAdminConfig
      .get(`api/auth/master/company/view/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setPosts(response?.data?.view_data[0]);
        }
      })
      .catch((error) => {
        console.log("error=====>", error);
      });
    setLoader(false);
  };

  // =================== Get current Posts ===============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = null;

  // posts.slice(indexOfFirstPost, indexOfLastPost);

  // ============== Change Page ===================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  useEffect(() => {
    if (id) {
      fetchdata(id);
    }
  }, [id]);

  useEffect(() => {
    if (snackData.open && snackData.status == "error") {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "error",
        });
      }, 3000);
    } else if (snackData.open && snackData.status == "success") {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "success",
        });
      }, 1000);
    }
  }, [snackData.open]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<CustomSnackbar value={snackData} />}
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Comapny Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/customer/users`);
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
                <Container className="justify-content-center align-items-center">
                  <Row>
                    <Col sm={12} md={12}>
                      <div className="staffdetails-card">
                        <Row>
                          <Col md={12}>
                            <div className="details-container">
                              <div className="details-row">
                                <div className="details-label">
                                  Company Name:
                                </div>
                                <div className="details-value">
                                  {posts?.user_name || "N/A"}
                                </div>
                              </div>
                              <div className="details-row">
                                <div className="details-label">Email:</div>
                                <div className="details-value">
                                  {posts?.email || "N/A"}
                                </div>
                              </div>
                              <div className="details-row">
                                <div className="details-label">
                                  Contact Number:
                                </div>
                                <div className="details-value">
                                  {posts?.mobile || "N/A"}
                                </div>
                              </div>
                              <div className="details-row">
                                <div className="details-label">Address:</div>
                                <div className="details-value">
                                  {posts?.address || "N/A"}
                                </div>
                              </div>
                              <div className="details-row">
                                <div className="details-label">City:</div>
                                <div className="details-value">
                                  {posts?.city || "N/A"}
                                </div>
                              </div>
                              <div className="details-row">
                                <div className="details-label">Pincode:</div>
                                <div className="details-value">
                                  {posts?.zip_code || "N/A"}
                                </div>
                              </div>
                              {/* <div className="details-row">
                              <div className="details-label">
                                Profile Status:
                              </div>
                              <div className="details-value">
                                <Button
                                  disabled
                                  size="sm"
                                  variant="success"
                                  style={
                                    user?.is_active === true
                                      ? {
                                          backgroundColor: "#E4F1DD",
                                          color: "#FF7534",
                                          borderColor: "#FF7534",
                                          marginTop: 8,
                                        }
                                      : {
                                          backgroundColor: "#FDF8EA",
                                          color: "#EEC048",
                                          borderColor: "#EEC048",
                                          marginTop: 8,
                                        }
                                  }
                                >
                                  {user?.is_active === true
                                    ? "Active"
                                    : "Inactive"}
                                </Button>
                              </div>
                            </div> */}
                              <div className="details-row">
                                <div className="details-label">Status:</div>
                                <div className="details-value">
                                  <Button
                                    disabled
                                    size="sm"
                                    variant="success"
                                    style={
                                      posts?.status === 1
                                        ? {
                                            backgroundColor: "rgb(12 168 48)",
                                            opacity: "0.7",
                                            color: "#fff",
                                            borderColor: "#28a745",
                                            width: "10vh",
                                            fontSize: "12px",
                                            lineHeight: "1.5",
                                            borderRadius: ".2rem",
                                            padding: ".375rem .75rem",
                                          }
                                        : {
                                            backgroundColor: "#6c757d",
                                            opacity: "0.7",
                                            color: "#fff",
                                            borderColor: "#6c757d",
                                            width: "10vh",
                                            fontSize: "12px",
                                            lineHeight: "1.5",
                                            borderRadius: ".2rem",
                                            padding: ".375rem .75rem",
                                          }
                                    }
                                  >
                                    {posts?.status === 1
                                      ? "Active"
                                      : "Inactive"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item sm={4}>
                  <Box className="details-label">Company Logo</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.company_logo}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Company Certificate</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.company_certificate}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Company VAT </Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.company_vat}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

class Doctordetails extends Component {
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

export default Doctordetails;
