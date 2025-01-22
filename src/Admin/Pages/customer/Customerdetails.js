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
import { Stack } from "react-bootstrap";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nodata from "../../../Components/nodata/Nodata";
import Table from "react-bootstrap/Table";
// import TablePagination from "../../../Components/Pagination/Pagination";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [doc, setDoc] = useState({});
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  let tablehead = [
    "S/N",
    "Driver Name",
    "Email",
    "Contact No.",
    "Address",
    "State",
    "City",
    "Status",
    "Created At",
    "Action",
  ];
  const fetchdata = async (id) => {
    setLoader(true);
    await apiAdminConfig
      .get(`api/auth/master/customer/view/${id}`)
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

  console.group("posts21", posts);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<CustomSnackbar value={snackData} />}
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Customer Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/customer/customers`);
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
                          <Stack gap={2}>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Customer Name :
                              </Card.Title>
                              <Card.Text>{posts?.user_name || "N/A"}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Email :
                              </Card.Title>
                              <Card.Text>{posts?.email || "N/A"}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Contact Number :
                              </Card.Title>
                              <Card.Text> {posts?.mobile || "N/A"}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Address :
                              </Card.Title>
                              <Card.Text>{posts?.address || "N/A"}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                City :
                              </Card.Title>
                              <Card.Text> {posts?.city || "N/A"}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Pincode :
                              </Card.Title>
                              <Card.Text> {posts?.zip_code || "N/A"}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Created on :
                              </Card.Title>
                              <Card.Text>
                                {/* {moment(user.createdAt).format(
                                  "MMM DD,YYYY, hh:mm A"
                                )} */}
                                {posts?.created_at || "N/A"}
                              </Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Updated on :
                              </Card.Title>
                              <Card.Text>
                                {/* {moment(user.updatedAt).format(
                                  "MMM DD,YYYY, hh:mm A"
                                )} */}
                                {posts?.updated_at || "N/A"}
                              </Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Status :
                              </Card.Title>
                              <Card.Text>
                                {" "}
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
                              </Card.Text>
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          {/* <div className="adminContant">
            <Card style={{ marginTop: "1%" }}>
              <Card.Body style={{ minHeight: "300px" }}>
                <Tabs
                  defaultActiveKey="1"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="1" title="Appointments">
                    {currentPost && currentPost.length !== 0 ? (
                      <Table size="md" responsive>
                        <thead
                          style={{
                            backgroundColor: "#F0F1F2",
                            textAlign: "left",
                          }}
                        >
                          <tr>
                            {tablehead.map((el, id) => {
                              return (
                                <th
                                  style={
                                    id === 0
                                      ? { width: "100%" }
                                      : el === "Action"
                                        ? {
                                          minWidth: "15vh",
                                          textAlign: "center",
                                        }
                                        : { minWidth: "25vh" }
                                  }
                                  key={id}
                                >
                                  {el}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "left" }}>
                          {currentPost.map((el, id) => {
                            return (
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{el?._id}</td>
                                <td>{el?.user_id?.patient_id}</td>
                                <td>{el?.departmentname}</td>
                                <td>{moment(el?.date).format("DD/MM/YYYY")}</td>
                                <td>{el?.room_time_slot_id?.start_time}</td>
                                <td>{el?.appointment_type}</td>
                                <td>
                                  <Button
                                    disabled
                                    size="small"
                                    variant="success"
                                    style={
                                      el.status === "done"
                                        ? {
                                          backgroundColor: "#E4F1DD",
                                          color: '#FF7534',
                                          borderColor: '#FF7534',
                                          width: "15vh",
                                        }
                                        : {
                                          backgroundColor: "#FDF8EA",
                                          color: "#EEC048",
                                          borderColor: "#EEC048",
                                          width: "15vh",
                                        }
                                    }
                                  >
                                    {el.status === "done" ? "DONE" : el.status}
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    disabled
                                    size="small"
                                    variant="success"
                                    style={
                                      el.payment_status === true
                                        ? {
                                          backgroundColor: "#E4F1DD",
                                          color: '#FF7534',
                                          borderColor: '#FF7534',
                                          width: "15vh",
                                        }
                                        : {
                                          backgroundColor: "#FDF8EA",
                                          color: "#EEC048",
                                          borderColor: "#EEC048",
                                          width: "15vh",
                                        }
                                    }
                                  >
                                    {el.payment_status === true
                                      ? "Paid"
                                      : "Pending"}
                                  </Button>
                                </td>
                                <td>{el?.cancelledBy?.toUpperCase()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    ) : (
                      <div>
                        <Nodata />
                      </div>
                    )}
                  </Tab>
                  <Tab eventKey="2" title="Dashboard">
                    <Card border="light" style={{ textAlign: "left" }}>
                      <Card.Title>Cancelled Appointment Details</Card.Title>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={4}>
                                    <h2>{doc.admin}</h2>
                                    <h6>By Admin</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{doc.patient}</h2>
                                    <h6>By Patient</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{doc.data}</h2>
                                    <h6>Total</h6>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="3" title="Rating"></Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div> */}
        </>
      )}
    </>
  );
};

class CustomerDetails extends Component {
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

export default CustomerDetails;
