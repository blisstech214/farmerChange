import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsSearch, BsX } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { apiAdminConfig } from "../../../utils/api";
import { useFormik } from "formik";
import { useSnackbar } from "../../../provider/snackbar";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import Nodata from "../../../Components/nodata/Nodata";
import { UserType } from "../../../utils/constant";
import { Image } from "react-bootstrap";

const Contant = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const snackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageData, setPageData] = React.useState({});
  const [id, setId] = React.useState("");
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  let tablehead = ["S/N", "Image", "Title", "User Type", "Description"];
  const [search, setSearch] = useState("");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };
  const fetchdata = async (value) => {
    setLoading(true);
    await apiAdminConfig
      .get("api/auth/master/notification/list", {
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

  const formik = useFormik({
    initialValues: {
      title: "",
      user_type: "company",
      description: "",
      image: "",
      image_url: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      if (!values.user_type) {
        errors.user_type = "User Type is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url, method;

      if (id) {
        url = `/api/auth/master/admin/update/${id}`;
        method = "POST";
      } else {
        url = `/api/auth/master/notification/add`;
        method = "POST";
      }

      let formData = new FormData(); //formdata object

      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("image", values?.image);
      formData.append("user_type", values?.user_type);

      await apiAdminConfig
        .request({ url: url, method: method, data: formData })
        .then((response) => {
          if (response?.status === 200) {
            snackbar({
              message: response.data.message,
              severity: "success",
            });
            formik.resetForm();
            setOpen(false);
            fetchdata();
          } else {
            snackbar({
              message: response.data.message,
              severity: "error",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 422) {
            console.log("response", response.data.error);
            // eslint-disable-next-line no-unused-vars
            for (const [key] of Object.entries(values)) {
              if (response.data.error[key]) {
                setErrors({ [key]: response.data.error[key][0] });
              }
            }
          }
          if (response?.data?.status === 406) {
            snackbar({
              message: response.data.message,
              severity: "success",
            });
          }
        });
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const bindData = async () => {
    await apiAdminConfig
      .get(`api/auth/master/admin/edit/${id}`)
      .then((response) => {
        if (response.status === 200) {
          if (
            response?.data?.view_data &&
            response?.data?.view_data?.length > 0
          ) {
            let newData = response?.data?.view_data[0];
            for (const [key] of Object.entries(formik.values)) {
              formik.setFieldValue([key], newData[key]);
            }
            // formik.setFieldValue(
            //   "image_url",
            //   `${newData.base_url}${newData?.image}`
            // );
          }
        }
      });
  };

  React.useEffect(() => {
    if (id && id) {
      bindData(id);
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                  Notifications
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FF7534", textTransform: "none" }}
                  onClick={handleOpen}
                >
                  Add Notificaiton
                </Button>
              </Box>
            </Stack>
            <div>
              <Box sx={{ mt: 4, minHeight: "100%" }}>
                {posts && posts.length !== 0 ? (
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
                      {posts &&
                        posts?.map((el, id) => {
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
                                {id + 1}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              >
                                <Avatar
                                  src={`${el?.base_url}${el?.image}`}
                                  alt={el?.title}
                                  variant="rounded"
                                />
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              >
                                {el.title || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el.user_type || "N/A"}
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                {el.description || "N/A"}
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
                  <Typography className="footer-text" sx={{ fontSize: "14px" }}>
                    Showing {pageData?.from}-{pageData?.to} of {pageData?.total}{" "}
                    entries
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
      )}

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
        <DialogContent sx={{ py: 2 }}>
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <Form.Group style={{ textAlign: "left" }} controlId="name">
                  <Stack
                    direction="row"
                    spacing={1.5}
                    mb={1}
                    alignItems="center"
                  >
                    {/* <Person fontSize="small" color="primary" /> */}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Title
                    </Typography>
                  </Stack>
                  <Form.Control
                    type="text"
                    value={formik.values.title}
                    name="title"
                    onChange={formik.handleChange}
                    placeholder="Enter Title"
                    className="mb-0"
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                  {formik.errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.title}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Form.Group style={{ textAlign: "left" }} controlId="userType">
                  <Stack
                    direction="row"
                    spacing={1.5}
                    mb={1}
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      User Type
                    </Typography>
                  </Stack>
                  <div>
                    <Form.Select
                      aria-label="Select.."
                      value={formik.values.user_type}
                      onChange={(e) => {
                        if (e.target.value) {
                          formik.setFieldValue("user_type", e.target.value);
                        }
                      }}
                      isInvalid={
                        formik.touched.user_type && formik.errors.user_type
                      }
                    >
                      {/* <option value="0">Choose User Type</option> */}
                      {UserType.map((el, id) => {
                        return (
                          <option key={id} value={el.value}>
                            {el.label}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </div>
                  {formik.errors.user_type && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.user_type}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Form.Group style={{ textAlign: "left" }} controlId="profile">
                  <Form.Label>Image</Form.Label>
                  {!formik.values.image && (
                    <Form.Control
                      id="fileInput"
                      name="image"
                      type="file"
                      value={""}
                      accept=".png, .jpg, .jpeg"
                      className="mb-0"
                      onChange={(e) => {
                        formik.setFieldValue("image", e.target.files[0]);
                        formik.setFieldValue(
                          "image_url",
                          URL.createObjectURL(e.target.files[0])
                        );
                      }}
                      isInvalid={formik.touched.image && formik.errors.image}
                    />
                  )}
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.image}
                  </Form.Control.Feedback>
                </Form.Group>

                {formik.values.image_url && (
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <Image
                      style={{ margin: "10px" }}
                      src={formik.values.image_url}
                      alt={formik.values.image}
                      width="150"
                      height="150"
                      thumbnail
                    />

                    <Button
                      variant="link"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "-5px",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => {
                        formik.setFieldValue("image", "");
                        formik.setFieldValue("image_url", "");
                      }}
                    >
                      <BsX
                        style={{
                          color: "#ff0000",
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                      />
                    </Button>
                  </div>
                )}
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <Form.Group style={{ textAlign: "left" }} controlId="name">
                  <Stack
                    direction="row"
                    spacing={1.5}
                    mb={1}
                    alignItems="center"
                  >
                    {/* <Person fontSize="small" color="primary" /> */}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Description
                    </Typography>
                  </Stack>
                  <Form.Control
                    type="text"
                    value={formik.values.description}
                    name="description"
                    onChange={formik.handleChange}
                    placeholder="Enter Description"
                    className="mb-0"
                    isInvalid={
                      formik.touched.description && formik.errors.description
                    }
                    as="textarea"
                    rows={3}
                  />
                  {formik.errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.description}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button type="submit">Submit</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

class Notification extends Component {
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

export default Notification;
