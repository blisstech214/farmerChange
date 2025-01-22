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
import { apiAdminConfig } from "../../../utils/api";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { Box, CardContent, Grid } from "@mui/material";

const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  // const [doc, setDoc] = useState({});
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });

  // ============= Get Doctor Data ==============
  const fetchdata = async (id) => {
    setLoader(true);
    await apiAdminConfig
      .get(`api/auth/master/driver/view/${id}`)
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
              <h3 style={{ height: "40px" }}>Driver Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/driver/drivers`);
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
                <Row>
                  <Col sm={12} md={12}>
                    <div className="staffdetails-card">
                      <Row>
                        <Col md={4}>
                          <Card
                            border="none"
                            style={{ border: "none", marginBottom: 5 }}
                          >
                            <Image
                              width="150"
                              height="150"
                              roundedCircle
                              src={`${posts?.base_url}${posts?.profile_img}`}
                              alt="staffimage.png"
                            />
                          </Card>
                        </Col>
                        <Col md={8}>
                          <div className="details-container">
                            <div className="details-row">
                              <div className="details-label">Driver Name:</div>
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
                            <div className="details-row">
                              <div className="details-label">Licence Date:</div>
                              <div className="details-value">
                                {posts?.license_expiry || "N/A"}
                              </div>
                            </div>
                            <div className="details-row">
                              <div className="details-label">
                                Registration On:
                              </div>
                              <div className="details-value">
                                {posts?.license_expiry || "N/A"}
                              </div>
                            </div>

                            <div className="details-row">
                              <div className="details-label">Job status:</div>
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
                                  {posts?.status === 1 ? "Active" : "Inactive"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item sm={4}>
                  <Box className="details-label">Driver Photo</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.profile_img}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Driver Licence Front</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.licence_front}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Driver Licence Back</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.licence_back}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Address Proof</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.address_proof}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Insurance Certificate</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.insurance_cert}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Transit Certificate</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.transit_cert}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label"> Public Liability Certificate</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.liability_cert}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">V5c Certificate</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.v5c_cert}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">Dvia Certificate</Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.dvia_cert}`}
                      alt="staffimage.png"
                    />
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box className="details-label">
                    Nationality Proof Certificate
                  </Box>
                  <Box className="details-value">
                    <Image
                      width="150"
                      height="150"
                      roundedCircle
                      src={`${posts?.base_url}${posts?.nationality_cert}`}
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
          
            <Contant />
          </div>
        )}
      </div>
    );
  }
}

export default Doctordetails;
