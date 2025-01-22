import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";
import AddIcon from "@mui/icons-material/Add";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Dropdown from "react-bootstrap/Dropdown";
import TablePagination from "../../../Components/Pagination/Pagination";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  Box,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Card,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdRemoveRedEye, MdDelete, MdMode } from "react-icons/md";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { apiAdminConfig } from "../../../utils/api";
import Nodata from "../../../Components/nodata/Nodata";
import Popup from "../../../Components/popup/Popup";
import Loader from "../../../Components/Loader/Loader";

const Contant = () => {
  const tempData = [
    {
      id: 1,
      jobTitle: "Job Title 1",
      pickUpAddress: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      pickUpDate: "2021-10-10",
      pickUpTime: "10:00 AM",
      deliveryDate: "2021-10-10",
      deliveryTime: "10:00 AM",
      status: "Active",
      createdAt: "2021-10-10",
    },
    {
      id: 2,
      jobTitle: "Job Title 2",
      pickUpAddress: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      pickUpDate: "2021-10-10",
      pickUpTime: "10:00 AM",
      deliveryDate: "2021-10-10",
      deliveryTime: "10:00 AM",
      status: "Active",
      createdAt: "2021-10-10",
    },
  ]

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [filterState, setFilterState] = useState([]);
  const [filterCity, setfilterCity] = useState([]);
  const [filterdeptName, setfilterdeptName] = useState([]);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageData, setPageData] = React.useState({});
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });

  const [open, setOpen] = useState(false);

  let tablehead = [
    "S/N",
    "Job Title",
    "Pick-Up Address",
    "Pick-Up Date",
    "Pick-Up Time",
    "Delivery Date",
    "Delivery Time",
    "Action",
  ];
  const [search, setSearch] = useState("");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const fetchdata = async (value) => {
    // setLoading(true);
    // await apiAdminConfig
    //   .get("api/auth/master/customer/view", {
    //     params: {
    //       search: value,
    //       per_page: pageSize,
    //       page: page,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log(response.data, "skk");
    //       setPageCount(response?.data?.view_data?.last_page);
    //       setPageSize(response?.data?.view_data?.per_page);
    //       setPageData(response?.data?.view_data);

    //       setPosts(response?.data?.view_data?.data);
    //       setLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  React.useEffect(() => {
    fetchdata(search);
  }, [search, page, pageSize]);

  const handleClose = () => {
    setOpen(false);
  };

  const updateStatus = async (id, status) => {
    console.log("error---->", id,status);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    setsnackdata({
      open: false,
      message: "",
      status: "success",
    });
  
    let apiEndpoint = "";
    let statusType = "";
  
    if (!status) {
      apiEndpoint = `api/auth/master/verify-user/${id}`;
      statusType = "success";
    } else if (status === 1) {
      apiEndpoint = `api/auth/master/customer/status/deactive/${id}`;
      statusType = "success";
    } else if (status === 2) {
      apiEndpoint = `api/auth/master/customer/status/active/${id}`;
      statusType = "success";
    } else {
      console.error("Invalid status");
      return;
    }
  
    try {
      const response = await apiAdminConfig.get(apiEndpoint);
      if (response && response?.status === 200) {
        fetchdata();
        await wait(1000); // Assuming you have a wait function
        setsnackdata({
          open: true,
          message: response.data.message,
          status: statusType,
        });
      }
    } catch (error) {
      console.log("error---->", error);
    }
  };

  //handle Delete function
  const handleDelete = async (id) => {
    setOpen(id);
  };

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPost = posts;
  // .filter(
  //   (el) =>
  //     el.doctorName.toLowerCase().includes(query.toLowerCase()) ||
  //     el.email.toLowerCase().includes(query.toLowerCase()) ||
  //     el.specialization.toLowerCase().includes(query.toLowerCase()) ||
  //     el.contactNumber.toString().includes(query.toString())
  // )
  // .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  useEffect(() => {
    // if (snackData.open && snackData.status == 'error') {
    //   setTimeout(() => {
    //     setsnackdata({
    //       open: false,
    //       message: "",
    //       status: "error",
    //     });
    //   }, 3000);
    // } else if (snackData.open && snackData.status == 'success') {
    //   setTimeout(() => {
    //     setsnackdata({
    //       open: false,
    //       message: "",
    //       status: "success",
    //     });
    //   }, 1000);
    // }
  }, [snackData.open]);

  const [age, setAge] = React.useState(10);
  const [selectOpen, setSelectOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const handleOpen = () => {
    setSelectOpen(true);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomSnackbar value={snackData} />
          <Card
            sx={{
              boxShadow: "none!important",
              borderRadius: "20px!important",
              mt: 4,
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" mb={8}>
                <Box>
                  <Typography
                    component="h3"
                    sx={{ fontSize: "30px", fontWeight: 500 }}
                  >
                    Jobs
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      textTransform: "none",
                      borderRadius: "15px",
                      padding: "0.875rem 1.5rem",
                      fontSize: "14px !important",
                      lineHeight: "1",
                      // ":hover": {
                      //   background: (theme) => theme.palette?.primary?.main,
                      //   color: (theme) =>
                      //     `${theme?.palette?.common?.white}!important`,
                      // },
                    }}
                    startIcon={<AddIcon color="primary" />}
                    onClick={() => {
                      navigate(`/master/ride/rides/add`);
                    }}
                  >
                    Add Jobs
                  </Button>
                </Box>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                mb={2}
                mt={4}
                alignItems="center"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ fontSize: "13px" }}>Show</Typography>
                  <FormControl size="small">
                    <Select
                      sx={{ fontSize: "13px" }}
                      open={selectOpen}
                      onClose={handleSelectClose}
                      onOpen={handleOpen}
                      value={pageSize}
                      onChange={handlePageSizeChange}
                    >
                      <MenuItem sx={{ fontSize: "13px" }} value={10}>
                        10
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "13px" }} value={25}>
                        25
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "13px" }} value={50}>
                        50
                      </MenuItem>
                      <MenuItem sx={{ fontSize: "13px" }} value={100}>
                        100
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography sx={{ fontSize: "13px" }}>entries</Typography>
                </Stack>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ fontSize: "13px" }}>Search :</Typography>
                    <FormControl size="small">
                      <TextField
                        sx={{ fontSize: "13px" }}
                        size="small"
                        id="outlined-controlled"
                        // label="Controlled"
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value);
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Box>
              </Stack>
              <div>
                <Box sx={{ mt: 4, minHeight: "100%" }}>
                  {tempData && tempData.length !== 0 ? (
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
                        {tempData.map((el, id) => {
                          return (
                            <tr key={id} style={{ fontSize: "14px" }}>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {id + 1}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el.jobTitle || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el.pickUpAddress || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el?.pickUpDate || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el?.pickUpTime || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el?.deliveryDate || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el?.deliveryTime || "N/A"}
                              </td>
                              {/* <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el?.status || "N/A"}
                              </td> */}

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
                                              onClick={() => {
                                                navigate(
                                                  `/master/ride/rides/view/${el._id}`
                                                );
                                              }}
                                            >
                                              <MdRemoveRedEye size={18} /> View
                                            </Dropdown.Item>
                                          \  <Button
                                              // disabled
                                              size="sm"
                                              variant="success"
                                              onClick={() =>
                                                updateStatus(
                                                  el.user_id,
                                                  el?.status
                                                )
                                              }
                                              style={
    el?.status === 0
      ? {
          // red
          backgroundColor: "red",
          opacity: "0.7",
          color: "#fff",
          borderColor: "#dc3545",
          width: "10vh",
          fontSize: "12px",
          lineHeight: "1.5",
          borderRadius: ".2rem",
          padding: ".375rem .75rem",
        }
      : el?.status === 1
      ? {
          // green
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
      : el?.status === 2
      ? {
          // pink
          backgroundColor: "#6c757d",
          opacity: "0.7",
          color: "#fff",
          borderColor: "#ff69b4",
          width: "10vh",
          fontSize: "12px",
          lineHeight: "1.5",
          borderRadius: ".2rem",
          padding: ".375rem .75rem",
        }
      : {
          // default grey
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
                                              {el?.status === 0
                                                ? "Verify"
                                                : el?.status === 1
                                                ? "Active"
                                                : el?.status === 2
                                                ? "Inactive"
                                                : "Unknown Status"}
                                            </Button>
                                            <Dropdown.Item
                                              onClick={() => {
                                                navigate(
                                                  `/master/ride/rides/edit/${el._id}`
                                                );
                                              }}
                                            >
                                              <MdMode size={18} /> Edit
                                            </Dropdown.Item>
                                            {/* <Dropdown.Item
                                          onClick={() => handleStatus(el)}
                                        >
                                          <MdToggleOn size={18} /> Change Status
                                        </Dropdown.Item> */}
                                            <Dropdown.Item
                                              onClick={() => {
                                                handleDelete(el.user_id);
                                              }}
                                            >
                                              <MdDelete size={18} /> Delete
                                            </Dropdown.Item>
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
                </Box>
                <Box
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    padding: "0px",
                    borderTop: "0px",
                  }}
                >
                  <div className="justify-content-between flex-wrap d-flex align-items-center">
                    <Typography
                      className="footer-text"
                      sx={{ fontSize: "14px" }}
                    >
                      Showing {pageData?.from}-{pageData?.to} of{" "}
                      {pageData?.total} entries
                    </Typography>
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

                    {/* <TablePagination
                      sx={{ fontSize: "14px" }}
                      postsPerPage={postsPerPage}
                      totalPosts={posts.length}
                      paginate={paginate}
                    /> */}
                  </div>
                </Box>
                {open && (
                  <Popup
                    title="Delete Customer"
                    id={open}
                    handleClose={handleClose}
                    handleDelete={handleClose}
                    fetchdata={fetchdata}
                    setsnackdata={setsnackdata}
                    setOpen={setOpen}
                  // actionURL="api/auth/master/customer/delete/"
                  />
                )}
              </div>{" "}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

class Rides extends Component {
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

export default Rides;
