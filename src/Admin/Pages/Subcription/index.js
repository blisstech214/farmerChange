import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useNavigate } from "react-router-dom";
// import Iconify from "../../../muiComponents/iconify";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { apiAdminConfig } from "../../../utils/api";
import Popup from "../../../Components/popup/Popup";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Iconify from "../../../muiComponents/iconify";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Subscription = () => {
  const [data, setData] = useState("");
  const [loadingCard, setLoadingCard] = useState(false);
  const [hover, setHover] = useState(0);
  const [value, setValue] = React.useState("driver");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });

  const handleDelete = async (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // API FETCH LIST
  const fetchdata = async (type = "driver") => {
    setLoadingCard(true);
    await apiAdminConfig
      .get(`/api/auth/master/plan/list/${type}`)
      .then((response) => {
        if (response.status === 200) {
          setLoadingCard(false);
          setData(response?.data.view_data);
        }
      })
      .catch((error) => {
        setLoadingCard(false);
        console.log("error", error);
      });
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchdata(newValue);
  };

  // API DELTE PLAN



  const updateStatus = async (id, status) => {
    setsnackdata({
      open: false,
      message: "",
      status: "success",
    });

    if (!status) {
      await apiAdminConfig
        .get(`api/auth/master/plan/active/${id}`)
        .then((response) => {
          if (response && response?.status === 200) {
            fetchdata(value);
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
    } else {
      await apiAdminConfig
        .get(`api/auth/master/plan/deactive/${id}`)
        .then((response) => {
          if (response && response?.status === 200) {
            fetchdata(value);
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
    }
  };

  const updateDefaultStatus = async (id, type) => {
    setsnackdata({
      open: false,
      message: "",
      status: "success",
    });

    await apiAdminConfig
      .post(`api/auth/master/plan/set-default`, {
        id: id,
        create_for: type,
      })
      .then((response) => {
        if (response && response?.status === 200) {
          fetchdata(value);
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
  React.useEffect(() => {
    if (snackData.open) {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "success",
        });
      }, 1000);
    }
  }, [snackData, snackData?.open]);
  return (
    <>
      <CustomSnackbar value={snackData} />

      <Card>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Driver" value="driver" />
                <Tab label="Customer" value="customer" />
                <Tab label="Company" value="company" />
              </Tabs>
            </Box>
            {/* <CustomTabPanel value={value} index={0}> */}
            <Stack direction="row" justifyContent="space-between" mb={8} mt={3}>
              <Box></Box>
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "15px",
                    padding: "0.875rem 1.5rem",
                    fontSize: "14px !important",
                    lineHeight: "1",
                  }}
                  startIcon={<AddIcon color="primary" />}
                  onClick={() => {
                    navigate(
                      `/master/subscription/subscriptions/${value}/create`
                    );
                  }}
                >
                  Add {value} Subscription
                </Button>
              </Box>
            </Stack>
            <Box>
              <Container>
                <Box pb={6}>
                  <Grid container justifyContent="left" spacing={6}>
                    {loadingCard ? (
                      <Box mt={4}>
                        <Container maxWidth>
                          <Grid container spacing={4}>
                            {[...Array(3)].map((index) => {
                              return (
                                <Grid item md={4}>
                                  <Card>
                                    <CardContent>
                                      <Skeleton
                                        variant="text"
                                        sx={{ fontSize: "1rem" }}
                                      />

                                      <Skeleton
                                        variant="circular"
                                        width={40}
                                        height={40}
                                      />
                                      <Skeleton
                                        variant="rectangular"
                                        width={210}
                                        height={60}
                                      />
                                      <Skeleton
                                        variant="rounded"
                                        width={210}
                                        height={60}
                                      />
                                    </CardContent>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Container>
                      </Box>
                    ) : (
                      <>
                        {!loadingCard && data.length <= 0 && (
                          <Grid container justifyContent="center">
                            <Grid item md={12}>
                              <Stack
                                alignItems="center"
                                justifyContent="center"
                                py={5}
                              >
                                <Typography variant="h4" textAlign="center">
                                  There is no plan type subscription
                                </Typography>
                              </Stack>
                            </Grid>
                          </Grid>
                        )}
                        {data &&
                          data.length > 0 &&
                          data.map((elem, index) => {
                            return (
                              <Grid item md={4} key={index}>
                                <Card
                                  sx={{ borderRadius: "5px" }}
                                  onMouseOver={() => setHover(index)}
                                  onMouseOut={() => setHover(false)}
                                >
                                  <Box
                                    sx={{
                                      textAlign: "center",
                                      py: 5,
                                      color: hover === index ? "#fff" : "",
                                      background:
                                        hover === index
                                          ? "#ff7534"
                                          : "#ff5d010f",
                                    }}
                                  >
                                    <Box>
                                      <Typography variant="h4">
                                        {elem.name}
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={0.6}
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Iconify icon="bi:currency-pound" />
                                      <Typography variant="h3">
                                        {elem.price}
                                      </Typography>
                                      <Typography
                                        fontSize={12}
                                        fontWeight={700}
                                      >
                                        PER MONTH
                                      </Typography>
                                    </Stack>
                                  </Box>
                                  <CardContent>
                                    <Stack spacing={1}>
                                      <Box>
                                        <Box textAlign="center">
                                          <List>
                                            <ListItem>
                                              <ListItemIcon>
                                                <Iconify
                                                  icon="charm:square-tick"
                                                  color={(theme) =>
                                                    theme.palette.success.main
                                                  }
                                                />
                                              </ListItemIcon>
                                              <ListItemText primary="Online System" />
                                            </ListItem>
                                            <ListItem>
                                              <ListItemIcon>
                                                <Iconify
                                                  icon="charm:square-tick"
                                                  color={(theme) =>
                                                    theme.palette.success.main
                                                  }
                                                />
                                              </ListItemIcon>
                                              <ListItemText primary=" Free apps" />
                                            </ListItem>
                                            <ListItem>
                                              <ListItemIcon>
                                                <Iconify
                                                  icon="system-uicons:cross"
                                                  color="red"
                                                />
                                              </ListItemIcon>
                                              <ListItemText primary=" Free apps" />
                                            </ListItem>
                                            <ListItem>
                                              <ListItemIcon>
                                                <Iconify
                                                  icon="charm:square-tick"
                                                  color={(theme) =>
                                                    theme.palette.success.main
                                                  }
                                                />
                                              </ListItemIcon>
                                              <ListItemText primary="live preview" />
                                            </ListItem>
                                            <ListItem>
                                              <ListItemIcon>
                                                <Iconify
                                                  icon="system-uicons:cross"
                                                  color="red"
                                                />
                                              </ListItemIcon>
                                              <ListItemText primary="Support unlimited" />
                                            </ListItem>
                                          </List>
                                        </Box>
                                      </Box>

                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={2}
                                      >
                                        <Button
                                          // disabled
                                          size="sm"
                                          variant="success"
                                          onClick={() =>
                                            updateStatus(
                                              elem.id,
                                              elem?.status
                                            )
                                          }
                                          style={
                                            elem?.status === 0
                                              ? {
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
                                              : elem?.status === 1
                                              && {
                                                  backgroundColor: "rgb(12 168 48)",
                                                  opacity: "0.7",
                                                  color: "#fff",
                                                  borderColor: "#28a745",
                                                  width: "10vh",
                                                  fontSize: "12px",
                                                  lineHeight: "1.5",
                                                  borderRadius: ".2rem",
                                                  padding: ".375rem .75rem",
                                                } }
                                        >

                                          {elem?.status === 0
                                            ? "Inactive"
                                            : elem?.status === 1
                                            && "Active"
                                            }
                                        </Button>
                                        <Button
                                          // disabled
                                          fullWidth
                                          variant="success"
                                          onClick={() => {
                                            // update status
                                            updateDefaultStatus(
                                              elem.id,
                                              elem?.create_for
                                            );
                                          }}
                                          style={
                                            elem?.default
                                              ? {
                                                  // green
                                                  backgroundColor:
                                                    "rgb(12 168 48)",
                                                  opacity: "0.7",
                                                  color: "#fff",
                                                  borderColor: "#28a745",
                                                  fontSize: "12px",
                                                  lineHeight: "1.5",
                                                }
                                              : {
                                                  // grey
                                                  backgroundColor: "#6c757d",
                                                  opacity: "0.7",
                                                  color: "#fff",
                                                  borderColor: "#6c757d",
                                                  fontSize: "12px",
                                                  lineHeight: "1.5",
                                                }
                                          }
                                        >
                                          {elem?.default
                                            ? "DEFAULT"
                                            : "NON-DEFAULT"}
                                        </Button>
                                      </Stack>
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={2}
                                      >
                                        <Button
                                          variant="outlined"
                                          fullWidth
                                          onClick={() => {
                                            navigate(
                                              `/master/subscription/subscriptions/${value}/${elem.id}`
                                            );
                                          }}
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="error"
                                          fullWidth
                                          onClick={() => handleDelete(elem.id)}
                                        >
                                          Delete
                                        </Button>
                                      </Stack>
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </Grid>
                            );
                          })}
                      </>
                    )}
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Box>
        </CardContent>
        {open && (
          <Popup
            title="Add New Driver"
            id={open}
            handleClose={handleClose}
            handleDelete={handleClose}
            fetchdata={fetchdata}
            value={value}
            setsnackdata={setsnackdata}
            setOpen={setOpen}
            actionURL="api/auth/master/plan/delete"
          />
        )}
      </Card>
    </>
  );
};

export default Subscription;
