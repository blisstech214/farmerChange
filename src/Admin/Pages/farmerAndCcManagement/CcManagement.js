import React from "react";
import { Button } from "react-bootstrap";
import { Box } from "@mui/material";
import { Table } from "react-bootstrap";

const CcManagement = () => {
  const ccDetails = [
    { id: 1, name: 'Customer Care 1', contact: 'contact1@example.com' },
    { id: 2, name: 'Customer Care 2', contact: 'contact2@example.com' },
    // Add more rows as needed
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
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Contact</th>
            <th style={{ padding: "12px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {ccDetails.map((cc) => (
            <tr key={cc.id}>
              <td style={{ padding: "10px", textAlign: "center" }}>{cc.id}</td>
              <td style={{ padding: "10px" }}>{cc.name}</td>
              <td style={{ padding: "10px" }}>{cc.contact}</td>
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
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          style={{
            color: "#FF7533",
            backgroundColor: "#FF753314",
            border: "2px solid #FF7533",
            padding: "10px 20px",
            borderRadius: "25px",
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
          Add Customer Care
        </Button>
      </div>
    </Box>
  );
};

export default CcManagement;
