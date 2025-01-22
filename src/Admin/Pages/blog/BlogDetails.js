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

  // ============= Get Doctor Data ==============
  const fetchdata = async (id) => {
    setLoader(true);
    await apiAdminConfig
      .get(`api/auth/master/blog/view/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setPosts(response?.data?.view_data);
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

  console.log("postsposts", posts);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<CustomSnackbar value={snackData} />}
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Blog Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
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
                              width="200"
                              height="200"
                              
                              // roundedCircle
                              src={`${posts?.base_url}${posts?.image}`}
                              alt={posts?.title}
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
                                Title :
                              </Card.Title>
                              <Card.Text> {posts?.title}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Description :
                              </Card.Title>
                              <Card.Text> {posts?.description}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Category
                              </Card.Title>
                              <Card.Text>{posts?.category}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                No of Review :
                              </Card.Title>
                              <Card.Text> 0</Card.Text>
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
                                {posts?.created_at}
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
                                {posts?.updated_at}
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
                                    posts?.status
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
                                  {posts?.status ? "Active" : "Inactive"}
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
