import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Table from "react-bootstrap/Table";
import AddIcon from "@mui/icons-material/Add";
import "../../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../../SideNav/sideBar";
import Dropdown from "react-bootstrap/Dropdown";
// import TablePagination from "../../../../Components/Pagination/Pagination";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdRemoveRedEye, MdDelete, MdMode } from "react-icons/md";
import CustomSnackbar from "../../../../Components/notify/Snackbar";
import { apiAdminConfig } from "../../../../utils/api";
import Nodata from "../../../../Components/nodata/Nodata";
import Popup from "../../../../Components/popup/Popup";
import Loader from "../../../../Components/Loader/Loader";
import { FaDotCircle } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";

const Contant = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [filterState, setFilterState] = useState([]);
  const [filterCity, setfilterCity] = useState([]);
  const [filterdeptName, setfilterdeptName] = useState([]);
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageData, setPageData] = React.useState({});
  let tablehead = [
    "S/N",
    "Collection Center's Name",
    "Email",
    "Contact No",
    "Status",
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
    await apiAdminConfig
      .get("api/auth/master/driver/search", {
        params: {
          search: value,
          per_page: pageSize,
          page: page,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("response?.data", response?.data);
          setPageCount(response?.data?.view_data?.last_page);
          setPageSize(response?.data?.view_data?.per_page);
          setPageData(response?.data?.view_data);
          setPosts(response?.data?.view_data?.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
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
    console.log("error---->", id, status);
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

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
    // margin: "20px 100px",
  }}
>
  <CardContent>
    <Stack direction="row" justifyContent="space-between" mb={8}>
      <Box>
        <Typography component="h3" sx={{ fontSize: "30px", fontWeight: 500 }}>
          Collection Center's
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
          }}
          startIcon={<AddIcon color="primary" />}
          onClick={() => {
            navigate(`/master/driver/drivers/add`);
          }}
        >
          Add New Collection Center
        </Button>
      </Box>
    </Stack>

    <Stack direction="row" justifyContent="space-between" mb={2} mt={4} alignItems="center">
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
            <input
              sx={{
                fontSize: "13px",
                border: "1px solid",
                borderRadius: "10px",
              }}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </FormControl>
        </Stack>
      </Box>
    </Stack>

    <Box sx={{ mt: 4, minHeight: "100%" }}>
      {posts && posts.length !== 0 ? (
        <Table
          size="lg"
          sx={{
            width: "100%",
            margin: "0 auto",
            tableLayout: "fixed",
          
          }}
        >
          <thead
            style={{
              backgroundColor: "#FF7534",
              color: "#fff",
              padding: "10px",
            }}
          >
            <tr>
              {tablehead.map((el, id) => (
                <th
                  key={id}
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    padding: "8px",
                    width: "auto",
                  }}
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((el, id) => (
              <tr key={id} style={{ fontSize: "14px", textAlign: "center" ,justifyItems:"center"}}>
                <td style={{ padding: "8px" }}>{id + 1}</td>
                <td
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                  onClick={() => {
                    navigate(`/master/driver/history/${el.id}`);
                  }}
                >
                  {el.user_name || "N/A"}
                </td>
                <td style={{ padding: "8px" ,  textAlign: "center", }}>{el.email || "N/A"}</td>
                <td style={{ padding: "8px" ,  textAlign: "center", }}>{el?.mobile || "N/A"}</td>
                <td
  style={{
    padding: "8px 12px",
    borderRadius: "8px",
    margin: "10px 10px",
    display: "inline-block",  // Inline Flex to center the content
    alignItems: "center",  // Vertical centering
    justifyContent: "center",  // Horizontal centering
    textAlign: "center",
    width: "80px",  // Adjust width for proper fit
    height: "40px",  // Adjust height for proper fit
    backgroundColor:
      el?.status === 0
        ? "#FFE5E5"
        : el?.status === 1
        ? "#E5F9E5"
        : "#F2F2F2",
    color:
      el?.status === 0
        ? "#FF0000"
        : el?.status === 1
        ? "#008000"
        : "#6c757d",
    // marginTop: el?.status === 1 ? "10px" : "0",  // Add space before "Active"
  }}
>
  <div
    // style={{
    //   display: "inline-block",  // To ensure the button stays within the content box
    //   width: "60px",  // Adjust width as needed
    //   height: "30px",  // Adjust height as needed
    //   textAlign: "center",  // Center text inside the button
    //   lineHeight: "30px",  // Vertically center text within the button
    //   borderRadius: "8px",
    //   backgroundColor: el?.status === 1 ? "#008000" : "#FF0000",  // Green for Active, Red for Deactive
    //   color: "white",
    //   fontWeight: "bold",
    //   cursor: "pointer",
    // }}
  >
    {el?.status === 0
      ? "Deactive"
      : el?.status === 1
      ? "Active"
      : "N/A"}
  </div>
</td>



                <td style={{ padding: "8px" }}>
                  <Dropdown>
                    <OverlayTrigger
                      rootClose
                      trigger="click"
                      placement="bottom"
                      overlay={
                        <Popover id="popover-basic">
                          <Popover.Body style={{ padding: "10px" }}>
                            <Stack gap={2}>
                              <Dropdown.Item
                                onClick={() => {
                                  navigate(`/master/driver/drivers/view/${el.user_id}`);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "start",
                                  gap: "8px",
                                  padding: "3px",
                                  fontSize: "14px",
                                }}
                              >
                                <MdRemoveRedEye size={18} />
                                View
                              </Dropdown.Item>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() =>
                                  updateStatus(el.user_id, el?.status === 0 ? 1 : 0)
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "start",
                                  justifyContent: "start",
                                  gap: "8px",
                                  width: "100%",
                                  fontSize: "14px",
                                  color: el?.status === 0 ? "#008000" : "#FF0000",
                                  backgroundColor:
                                    el?.status === 0 ? "#E5F9E5" : "#FFE5E5",
                                  borderColor: "#ccc",
                                  padding: ".375rem .75rem",
                                  borderRadius: ".2rem",
                                }}
                              >
                                {el?.status === 0 ? "Activate" : "Deactivate"}
                              </Button>
                              <Dropdown.Item
                                onClick={() => {
                                  handleDelete(el.user_id);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "8px 12px",
                                  fontSize: "14px",
                                }}
                              >
                                <TbMailFilled size={18} />
                                Mail
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  navigate(`/master/driver/drivers/edit/${el?.user_id}`);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "8px 12px",
                                  fontSize: "14px",
                                }}
                              >
                                <MdMode size={18} />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  handleDelete(el.user_id);
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "8px 12px",
                                  fontSize: "14px",
                                }}
                              >
                                <MdDelete size={18} />
                                Delete
                              </Dropdown.Item>
                            </Stack>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>
                    </OverlayTrigger>
                  </Dropdown>
                </td>
              </tr>
            ))}
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
        <Typography className="footer-text" sx={{ fontSize: "14px" }}>
          Showing {pageData?.from}-{pageData?.to} of {pageData?.total} entries
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
                    <Typography sx={{ fontSize: "14px" }}>Previous</Typography>
                  );
                },
                next: () => {
                  return <Typography sx={{ fontSize: "14px" }}>Next</Typography>;
                },
              }}
              {...item}
            />
          )}
        />
      </div>
    </Box>
  </CardContent>
</Card>

        </>
      )}
    </>
  );
};

class Doctors extends Component {
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

export default Doctors;
