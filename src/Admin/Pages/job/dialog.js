import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobDialog = ({ addressOpen = [], onClose }) => {
  return (
    <Dialog
      open={addressOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Address Detail</DialogTitle>
      <DialogContent>
        <Table responsive aria-label="simple table">
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
              <th style={{ width: "100px" }}>Sr.no.</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "left", fontSize: "14px" }}>
            {addressOpen &&
              addressOpen?.length > 0 &&
              addressOpen.map((addressItem, addressIndex) => (
                <tr key={`Address-${addressIndex}`}>
                  <td style={{ verticalAlign: "middle" }}>
                    {addressIndex + 1}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {addressItem.address}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
