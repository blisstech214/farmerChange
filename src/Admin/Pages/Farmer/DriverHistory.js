import React, {  Component, useState } from "react";
import Table from "react-bootstrap/Table";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
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
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Nodata from "../../../Components/nodata/Nodata";
import Loader from "../../../Components/Loader/Loader";
import moment from "moment";

const Contant = () => {

  const [loading, setLoading] = useState(false);
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageData, setPageData] = React.useState({});
  let tablehead = [
    "S/N",
    "Driver Name",
    "Total Jobs",
    "Total Earning",
    "Job Status",
    "Created At",
  ];

  const tempData = [
    {
      id: 1,
      driverName: "John Doe",
      totalJobs: "8",
      totalEarning: "1000",
      jobStatus: "Completed",
      createdAt: "12/12/2021",
    },
    {
      id: 2,
      driverName: "John Doe",
      totalJobs: "10",
      totalEarning: "1000",
      jobStatus: "Completed",
      createdAt: "12/12/2021",
    },
    {
      id: 3,
      driverName: "John Doe",
      totalJobs: "10",
      totalEarning: "1000",
      jobStatus: "Completed",
      createdAt: "12/12/2021",
    },
  ];
  const [search, setSearch] = useState("");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };
 

  const [selectOpen, setSelectOpen] = React.useState(false);

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
                    Driver History
                  </Typography>
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
                        {tempData &&
                          tempData.map((el, id) => {
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
                                  {el.driverName || "N/A"}
                                </td>
                                <td
                                  style={{
                                    fontSize: "14px",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {el.totalJobs || "N/A"}
                                </td>
                                <td
                                  style={{
                                    fontSize: "14px",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {el?.totalEarning || "N/A"}
                                </td>
                                <td
                                  style={{
                                    fontSize: "14px",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {el?.jobStatus || "N/A"}
                                </td>

                                <td style={{ width: "20vh" }}>
                                  {moment(el?.createdAt).format("DD/MM/YYYY")}
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
                  </div>
                </Box>
              </div>{" "}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

class DriverHistory extends Component {
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

export default DriverHistory;
