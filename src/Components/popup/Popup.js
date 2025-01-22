import React from "react";
import { Modal, Button } from "react-bootstrap";
import { apiAdminConfig } from "../../utils/api";

const Popup = ({
  show,
  handleClose,
  fetchdata,
  setsnackdata,
  id,
  setOpen,
  actionURL,
  value,
}) => {
  const handleDelete = async () => {
    await apiAdminConfig
      .delete(`${actionURL}/${id}`)
      .then((response) => {
        if (response && response?.status === 200) {
          fetchdata(value);
          handleClose();
          setOpen(false);
          setTimeout(() => {
            setsnackdata({
              open: true,
              message: response.data.message,
              status: "success",
            });
          }, 1000);
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error---->", error);
      });
  };
  return (
    <Modal
      centered
      show={id}
      onHide={handleClose}
      size="md"
      className="model-contain"
    >
      <Modal.Header
        closeButton
        style={{ background: "#f8f9fa", borderBottom: "none" }}
      >
        <Modal.Title style={{ color: "#333" }}>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#f8f9fa" }}>
        <p style={{ fontSize: "18px", marginBottom: "0" }}>
          Are you sure you want to delete this?
        </p>
      </Modal.Body>
      <Modal.Footer style={{ background: "#f8f9fa", borderTop: "none" }}>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
