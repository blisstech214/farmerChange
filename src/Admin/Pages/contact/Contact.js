import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Pagination,
  PaginationItem,
} from "@mui/material";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { apiAdminConfig } from "../../../utils/api";
import { IoReload } from "react-icons/io5";
import Nodata from "../../../Components/nodata/Nodata";
import Dropdown from "react-bootstrap/Dropdown";
import {
  MdRemoveRedEye,
  MdDownloadDone,
  MdOutlineCancel,
  MdDelete,
  MdMode,
} from "react-icons/md";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

const Contant = () => {
  let navigate = useNavigate();

  const tempData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      subject: "Test",
      message: "Test",
      created_on: "2021-10-10",
    },
    {
      id: 2,
      name: "Rajesh",
      email: "rajesh@gmail.com",
      subject: "Test",
      message: "Test",
      created_on: "2021-10-10",
    },
  ];
  const [tableData, setTableData] = useState("");
  console.log(tableData, "dataa");
  const [posts, setPosts] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });

  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageData, setPageData] = React.useState({});
  const [search, setSearch] = useState("");


  let tablehead = [
    "S/N",
    "Name",
    "Email",
    "Subject",
    "Message",
    "Created On",
    // "Status",
    "Action",
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // ============== Get Data =================
  const fetchdata = async (value) => {
    // setLoader(true);
    await apiAdminConfig
      .get(`/api/auth/master/contact/view`, {
        params: {
          search: value,
          per_page: pageSize,
          page: page,
        },
      })
      .then((response) => {
        console.log("response contact", response);
        if (response.status === 200) {
          setTableData(response.data.view_data.enquiries.data);
          setPageCount(response.data.view_data.enquiries.last_page)
          setPageData(response.data.view_data.enquiries)
          setPageSize(response.data.view_data.enquiries.per_page)
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    console.log("fetchData 1");

    fetchdata();
  }, []);

  useEffect(() => {
    console.log("fetchData 2");

    fetchdata(search);
  }, [search, page, pageSize]);

  // ================ Get Current Posts ===============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPost = posts;
  // .filter(
  //   (el) =>
  //     el?.name?.toLowerCase().includes(query.toLowerCase()) ||
  //     el?.from?.toLowerCase().includes(query.toLowerCase()) ||
  //     el?.subject?.toLowerCase().includes(query.toLowerCase()) ||
  //     el?.contact_id?.toLowerCase().includes(query.toLowerCase())
  // )
  // .slice(indexOfFirstPost, indexOfLastPost);

  // ================ Change Page ===================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  // ============== Handle Filter ===================

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
        {<CustomSnackbar value={snackData} />}
        <Card
            sx={{
              boxShadow: "none!important",
              borderRadius: "20px!important",
              mt: 4,
            }}>
             <CardContent>
          <Row className="mt-4">
            <Col md={8} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Contact Us</h3>
            </Col>

            <Col md={4}>
              <InputGroup className="mb-3">
                <Form.Control
                  className="rounded"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Search"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Body className="mt-4" style={{ minHeight: "300px" }}>
                {tableData && tableData !== 0 ? (
                  <Table size="lg" responsive>
                    <thead
                      style={{
                        // backgroundColor: "#F0F1F2",
                        color: "#fff",
                        padding: "10px",
                        backgroundColor: "#FF7534",
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      <tr style={{ width: "100%" }}>
                        {tablehead.map((el, id) => {
                          return (
                            <th
                              key={id}
                              style={{
                                textAlign: "center",
                                verticalAlign: "middle",
                                fontSize: "14px",
                              }}
                            >
                              {el}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "left", fontSize: "14px" }}>
                      {tableData &&
                        tableData?.map((el, id) => {
                          const serialNumber = id + 1 + (currentPage - 1) * postsPerPage;

                          return (
                            <tr
                              key={id}
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                               {serialNumber}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate(`/master/driver/history/${el.id}`);
                                }}
                              >
                                {el.name || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el.email || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el.subject || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  width:"1px",
                                  whiteSpace:"nowrap",
                                  textOverflow:"ellipsis",
                                  overflow:"hidden"
                                }}
                              >
                              <Box component="p" sx={{width:"1px"}}>

                                {el.message || "N/A"}
                              </Box>
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {moment(el.created_at).format("DD/MM/YYYY") || "N/A"}
                              </td>
                              {/* <td style={{ width: "20vh" }}>
                              {moment(el?.createdAt).format("DD/MM/YYYY")}
                            </td> */}
                              <td style={{ textAlign: "center" }}>
                                <Dropdown>
                                  <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="bottom"
                                    overlay={
                                      <Popover id="popover-basic">
                                        <Popover.Body>
                                          <Stack gap={2}>
                                            <Dropdown.Item
                                              onClick={(e) => {
                                                navigate(
                                                  `/master/setting/contactus/view/${el.id}`
                                                );
                                              }}
                                            >
                                              <MdRemoveRedEye size={18} /> View
                                            </Dropdown.Item>
                                           
                                            {/* <Dropdown.Item
                                            // onClick={() => {
                                            //   handleDelete(el.id);
                                            // }}
                                            >
                                              <MdDelete size={18} /> Delete
                                            </Dropdown.Item> */}
                                          </Stack>
                                        </Popover.Body>
                                      </Popover>
                                    }
                                  >
                                    <Dropdown.Toggle
                                      variant="light"
                                      id="dropdown-basic"
                                    >
                                      <BsThreeDotsVertical />
                                    </Dropdown.Toggle>
                                  </OverlayTrigger>
                                </Dropdown>
                              </td>
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
              </Card.Body>{" "}
              <Card.Footer
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px",
                }}
              >
                <div className="justify-content-between flex-wrap d-flex align-items-center">
                  <Card.Text className="footer-text">
                  Showing {pageData?.from}-{pageData?.to} of{" "}
                      {pageData?.total} entries
                  </Card.Text>
                  <Pagination
                      count={pageCount}
                      color="primary"
                      page={page}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                      renderItem={(item) => (
                        <PaginationItem
                          slots={{
                            previous: () => {
                              return (
                                <Typography sx={{ fontSize: "14px" }}>
                                  Previous
                                </Typography>
                              );
                            },
                            next: () => {
                              return (
                                <Typography sx={{ fontSize: "14px" }}>
                                  Next
                                </Typography>
                              );
                            },
                          }}
                          {...item}
                        />
                      )}
                    />
                </div>
              </Card.Footer>
            </Card>
          </div>
          </CardContent>
        </Card>
        </>
      )}
    </>
  );
};

class AdminContact extends Component {
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

export default AdminContact;
