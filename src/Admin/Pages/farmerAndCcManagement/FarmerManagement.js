import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { Box } from "@mui/material";

const Contant = () => {
  const staticData = [
    { "S/N": 1, FarmName: "John Doe", email: "john@example.com", phone: "1234567890", status: "approved" },
    { "S/N": 2, FarmName: "Jane Smith", email: "jane@example.com", phone: "9876543210", status: "rejected" },
    { "S/N": 3, FarmName: "Alice Johnson", email: "alice@example.com", phone: "4567891230", status: "approved" },
  ];

  return (
    <Box
      sx={{
        width: "90%",
        margin: "20px auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Table
        bordered
        responsive
        style={{
          borderCollapse: "separate",
          borderSpacing: "0",
          margin: "0",
        }}
      >
        <thead
          style={{
            backgroundColor: "#FF7534",
            color: "#fff",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>S/N</th>
            <th style={{ padding: "12px" }}>Farm Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Phone</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Farm Details</th>
          </tr>
        </thead>
        <tbody>
          {staticData.map((item) => (
            <tr key={item["S/N"]}>
              <td style={{ padding: "10px", textAlign: "center" }}>{item["S/N"]}</td>
              <td style={{ padding: "10px" }}>{item.FarmName}</td>
              <td style={{ padding: "10px" }}>{item.email}</td>
              <td style={{ padding: "10px" }}>{item.phone}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button
                  style={{
                    color: item.status === "approved" ? "#4caf50" : "#f44336",
                    backgroundColor: item.status === "approved" ? "#d4f7d4" : "#f7d4d4",
                    border: `2px solid ${item.status === "approved" ? "#4caf50" : "#f44336"}`,
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "0.3s",
                    outline: "none",
                  }}
                >
                  {item.status === "approved" ? "Approved" : "Rejected"}
                </Button>
              </td>
              <td
                style={{
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <Button
                  style={{
                    color: "#FF7533",
                    backgroundColor: "#FF753314",
                    border: "2px solid #FF7533",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "0.3s",
                    outline: "none",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#FF7533";
                    e.target.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#FF753314";
                    e.target.style.color = "#FF7533";
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

class Doctors extends Component {
  render() {
    return (
      <Box>
        {/* Content Section */}
        <Contant />
      </Box>
    );
  }
}

export default Doctors;
