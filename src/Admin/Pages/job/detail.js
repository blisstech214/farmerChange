import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Image from "react-bootstrap/Image";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { apiAdminConfig } from "../../../utils/api";
import CustomSnackbar from "../../../Components/notify/Snackbar";
// import TablePagination from "../../../Components/Pagination/Pagination";
import { useSnackbar } from "../../../provider/snackbar";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import JobDialog from "./dialog";
import { Visibility } from "@mui/icons-material";
import { Table } from "react-bootstrap";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});
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
      .get(`api/auth/master/jobs/view/${id}`)
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

  const [addressOpen, setAddressopen] = React.useState(false);

  console.log("postsposts", posts);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<CustomSnackbar value={snackData} />}
          <Box>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Box>
                    <h3>Job Details</h3>
                  </Box>

                  <Box>
                    <Button
                      onClick={() => {
                        navigate(`/master/job/jobs/list`);
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
                  </Box>
                </Stack>
                <Row>
                  <Col sm={12} md={12}>
                    <div className="staffdetails-card">
                      <Row>
                        <Col md={8}>
                          <div className="details-container">
                            <div className="details-row">
                              <div className="details-label">Job Name:</div>
                              <div className="details-value">
                                {posts?.name || "N/A"}
                              </div>
                            </div>
                            <div className="details-row">
                              <div className="details-label">Vehicle Name:</div>
                              <div className="details-value">
                                {posts?.vehicle || "N/A"}
                              </div>
                            </div>

                            <div className="details-row">
                              <div className="details-label">Job Status:</div>
                              <div className="details-value">
                                <Button
                                  // disabled
                                  size="sm"
                                  variant="outlined"
                                  color={
                                    posts.status === 0
                                      ? "warning"
                                      : posts.status === 1
                                      ? "info"
                                      : posts.status === 2
                                      ? "success"
                                      : posts.status === 3
                                      ? "primary"
                                      : "success"
                                  }
                                >
                                  {posts.status === 0
                                    ? "Pending"
                                    : posts.status === 1
                                    ? "Confirm  Job"
                                    : posts.status === 2
                                    ? "Complete Job"
                                    : posts.status === 3
                                    ? "Completed"
                                    : "Accept Bid"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>

                <Card>
                  <CardContent>
                    <TableContainer component={Paper}>
                      <Table size="lg" responsive>
                        <thead
                          style={{
                            // backgroundColor: "#F0F1F2",
                            color: "#fff",
                            padding: "10px",
                            backgroundColor: "#FF7534",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          <tr style={{ width: "100%" }}>
                            <th>Image</th>
                            <th>Material</th>
                            <th>Pickup Date</th>
                            <th>Pickup Time</th>
                            <th>Drop Date</th>
                            <th>Drop Time</th>
                            <th>L*W*H</th>
                            {/* <th>Height</th>
                            <th>Width</th>
                            <th>Length</th> */}
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "left", fontSize: "14px" }}>
                          {posts?.items &&
                            posts?.items?.length > 0 &&
                            posts?.items.map((productItem, productIndex) => {
                              console.log(productItem?.product, "DSdcsd");
                              return (
                                <React.Fragment key={`product-${productIndex}`}>
                                  <tr>
                                    <td>
                                      <Box
                                        component="img"
                                        src={`${productItem?.product?.base_url}${productItem?.product?.image}`}
                                        sx={{ width: "40px", m: "auto" }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        textAlign: "center",
                                      }}
                                    >
                                      {productItem?.product?.material}
                                    </td>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        textAlign: "center",
                                      }}
                                    >
                                      {productItem?.product?.pickup_date}
                                    </td>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        textAlign: "center",
                                      }}
                                    >
                                      {productItem?.product?.pickup_time}
                                    </td>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        textAlign: "center",
                                      }}
                                    >
                                      {productItem?.product?.drop_date}
                                    </td>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        textAlign: "center",
                                      }}
                                    >
                                      {productItem?.product?.drop_time}
                                    </td>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        textAlign: "center",
                                      }}
                                    >
                                      {`${productItem?.product?.length}*${productItem?.product?.width}*${productItem?.product?.height}`}
                                    </td>
                                    {/* <td style={{ verticalAlign: "middle", }}>
                                    {productItem?.product?.height}
                                  </td>
                                  <td style={{ verticalAlign: "middle", }}>
                                    {productItem?.product?.width}
                                  </td>
                                  <td style={{ verticalAlign: "middle", }}>
                                    {productItem?.product?.length}
                                  </td> */}
                                    <td style={{ textAlign: "center" }}>
                                      <IconButton
                                        onClick={() =>
                                          setAddressopen(productItem?.address)
                                        }
                                      >
                                        <Visibility />
                                      </IconButton>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                        </tbody>
                      </Table>
                      {/* <Table aria-label="simple table">
                        <TableHead>
                          <TableRow></TableRow>
                        </TableHead>
                        <TableBody></TableBody>
                      </Table> */}
                    </TableContainer>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Box>
          <JobDialog addressOpen={addressOpen} onClose={setAddressopen} />
        </>
      )}
    </>
  );
};

class JobDetail extends Component {
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

export default JobDetail;
