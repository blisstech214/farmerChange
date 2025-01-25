import React, { Component, useState } from "react";
import { Box, Card, CardContent, Typography, Pagination } from "@mui/material";
import Table from "react-bootstrap/Table";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Loader from "../../../Components/Loader/Loader";
import Nodata from "../../../Components/nodata/Nodata";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../SideNav/sideBar";

const Contant = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Set to false as no API is needed now
  const [posts, setPosts] = useState([
    {
      id: 1,
      user_name: "John Doe",
      email: "john@example.com",
      mobile: "123456789",
      status: 0,
    },
    {
      id: 2,
      user_name: "Jane Smith",
      email: "jane@example.com",
      mobile: "987654321",
      status: 1,
    },
    {
      id: 3,
      user_name: "Chris Evans",
      email: "chris@example.com",
      mobile: "564738291",
      status: 2,
    },
    {
      id: 4,
      user_name: "Scarlett Johansson",
      email: "scarlett@example.com",
      mobile: "564738292",
      status: 1,
    },
    // Add more static data here as needed
  ]);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [pageCount] = useState(1); // Adjust page count for static data

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let tablehead = [
    "S/N",
    "Driver's Name",
    "Email",
    "Contact No",
    "Status",
    "Driver's Details",
  ];

  // Get current Posts
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pagenumber) => {
    setPage(pagenumber);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomSnackbar value={{ open: false, message: "", status: "" }} />
          <Card
            sx={{
              boxShadow: "none!important",
              borderRadius: "20px!important",
              mt: 4,
            }}
          >
            <CardContent>
              <Box sx={{ mt: 4, overflowX: "auto" }}>
                {posts && posts.length !== 0 ? (
                  <Table
                    size="lg"
                    sx={{
                      width: "100%",
                      tableLayout: "fixed",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#FF7534",
                          color: "#fff",
                          fontSize: "14px",
                        }}
                      >
                        {tablehead.map((el, id) => (
                          <th
                            key={id}
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {el}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((el, id) => (
                        <tr
                          key={id}
                          style={{
                            fontSize: "14px",
                            textAlign: "center",
                            marginTop: "10px",
                            backgroundColor: id % 2 === 0 ? "#f9f9f9" : "#fff", // Alternating row colors
                          }}
                        >
                          <td style={{ padding: "12px" }}>{id + 1}</td>
                          <td
                            style={{
                              padding: "12px",
                              cursor: "pointer",
                              color: "#007bff",
                            }}
                            onClick={() => {
                              navigate(`/master/driver/history/${el.id}`);
                            }}
                          >
                            {el.user_name || "N/A"}
                          </td>
                          <td style={{ padding: "12px" }}>
                            {el.email || "N/A"}
                          </td>
                          <td style={{ padding: "12px" }}>
                            {el.mobile || "N/A"}
                          </td>
                          <td style={{ padding: "12px" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              {/* Approve Button */}
                              <button
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: "8px",
                                  border: "none",
                                  backgroundColor: "#d4edda",
                                  color: "#28a745",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Approve
                              </button>

                              {/* Reject Button */}
                              <button
                                style={{
                                  padding: "8px 16px",
                                  borderRadius: "8px",
                                  border: "none",
                                  backgroundColor: "#f8d7da",
                                  color: "#dc3545",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "8px 12px",
                              borderRadius: "8px",
                              margin: "10px 10px",
                              display: "inline-block", // Inline Flex to center the content
                              alignItems: "center", // Vertical centering
                              justifyContent: "center", // Horizontal centering
                              textAlign: "center",
                              width: "80px", // Adjust width for proper fit
                              height: "40px", // Adjust height for proper fit
                              backgroundColor: "#FF753314",
                              color: "#FF7533",
                              transition: "all 0.3s ease", // Smooth transition for hover effect
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#FF7533"; // Change background on hover
                              e.target.style.color = "#fff"; // Change text color on hover
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "#FF753314"; // Revert background
                              e.target.style.color = "#FF7533"; // Revert text color
                            }}
                          >
                            View
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
                  padding: "16px",
                  borderTop: "1px solid #ccc",
                }}
              >
                {/* Pagination Section */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    Showing {indexOfFirstPost + 1}-
                    {Math.min(indexOfLastPost, posts.length)} of {posts.length}{" "}
                    entries
                  </Typography>
                  <Pagination
                    count={pageCount}
                    color="primary"
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </div>
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
