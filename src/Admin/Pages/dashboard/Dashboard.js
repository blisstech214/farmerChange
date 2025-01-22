import React, { useEffect, Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../../admin.css";
import img5 from "../../../Assets/images/admin/businessman.png";
import img6 from "../../../Assets/images/admin/group.png";
import img7 from "../../../Assets/images/admin/subscription.png";
import img8 from "../../../Assets/images/admin/driver.png";
import img9 from "../../../Assets/images/admin/business-and-finance.png";
import img10 from "../../../Assets/images/admin/customer.png";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import GoogleApiWrapper from "../../../Components/googlemap/GoogleApiWrapper";
import { Container } from "react-bootstrap";
import { Stack, Box, styled, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { apiAdminConfig } from "../../../utils/api";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ReactEcharts from "echarts-for-react";
import briefcase from "../../../Assets/images/briefcase.png";
import driver from "../../../Assets/images/driver.png";
import user from "../../../Assets/images/user.png";
import subs from "../../../Assets/images/subs.png";
import moneyspend from "../../../Assets/images/moneyspend.png";
import hcustomer from "../../../Assets/images/hcustomer.png";

Chart.register(...registerables);

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  fontStyle: "normal",
  borderRadius: "4px",
  boxShadow: "none",
  textTransform: "capitalize",
  ":hover": {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
}));

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "20px",
  backgroundImage: "linear-gradient(to left, #ff5100, #FF7534)",
  // backgroundColor: '#FF7534',
  color: "#fff",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  fontStyle: "normal",
  textTransform: "capitalize",
  ":hover": {
    backgroundColor: "#FF7534",
    boxShadow: "none",
  },
}));

// const chartData = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'Total Income',
//       data: [12000, 19000, 3000, 5000, 2000, 3000, 7000],
//       backgroundColor: 'rgba(255, 106, 0)',
//       borderColor: 'rgba(255, 106, 0, 1)',
//       borderWidth: 1,
//       barPercentage: 0.3,
//       borderRadius: 10,
//     },
//   ]
// };

// const chartOptions = {
//   scales: {
//     y: {
//       beginAtZero: true,
//     }
//   }
// };

const getOption = () => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow", // 'line' | 'shadow'
      },
    },
    grid: {
      top: "3%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#6C7383",
        fontWeight: "bold",
      },
      data: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#6C7383",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Income",
        type: "bar",
        barWidth: "80%", // Adjust the width of the bar
        itemStyle: {
          borderRadius: 0,
          color: "#FF7534",
        },
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000],
      },
    ],
  };
};
const data = {
  jobs: briefcase,
  drivers: driver,
  admins: user,
  companies: subs,
  amount: moneyspend,
  customers: hcustomer,
};

// [
//   { jobs: "jobs", title: "Total Jobs", img: briefcase },
//   { drivers: "drivers", title: "Total Drivers", img: driver },
//   { admins: "admins", title: "Total Users", img: user },
//   { companies: "companies", title: "Total Companies", img: subs },
//   { amount: "amount", title: "Total Incomes", img: moneyspend },
//   { customers: "customers", title: "Total Customers", img: hcustomer },
// ];
const Contant = () => {
  const [dashboard, setDashboard] = useState([
    { title: "Total Jobs", img: briefcase, count: 0 },
    { title: "Total Drivers", img: driver, count: 0 },
    { title: "Total Users", img: user, count: 0 },
    { title: "Total Subscriptions", img: subs, count: 0 },
    { title: "Total Incomes", img: moneyspend, count: 0 },
    { title: "Total Customers", img: hcustomer, count: 0 },
  ]);
  const [loader, setLoader] = useState(false);

  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`api/auth/master/dashboard`)
      .then(async (response) => {
        let apidata = [response?.data?.view_data] || [];
        let newData = [];

        if (apidata && apidata?.length > 0) {
          for (const [key, value] of Object.entries(data)) {
            if (response?.data?.view_data[key]) {
              newData.push({
                title: `Total ${
                  response?.data?.view_data[key] && key === "admins"
                    ? "users"
                    : key
                }`,
                img: value,
                count: `${response?.data?.view_data[key]}`,
              });
            }
          }
          setDashboard(newData);
        }
        setLoader(false);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      {/* {" "}
      {loader ? (
        <Loader />
      ) : ( */}
      <>
        <div className="adminContant">
          <Container fluid>
            <Row>
              <Box sx={{ mb: 4, textAlign: "left" }}>
                <Typography
                  component="h3"
                  sx={{
                    fontWeight: "700!important",
                    fontSize: "1.525rem!important",
                  }}
                >
                  Welcome Admin
                </Typography>
              </Box>
              {dashboard.map((el, id) => {
                return el.title ? (
                  <Col lg={4} key={id} style={{ marginBottom: "20px" }}>
                    <CustomCard>
                      <CardContent sx={{ width: "100%" }}>
                        <Stack
                          direction="row"
                          spacing={6}
                          sx={{ width: "100%" }}
                        >
                          <Box component="div">
                            <Image
                              // roundedCircle
                              thumbnail
                              src={el.img}
                              alt="dashboardImage.png"
                              className="dashboardImage"
                            />
                          </Box>
                          <Box component="div">
                            <Box>
                              <Typography
                                component="h2"
                                sx={{
                                  fontSize: "0.875rem!important",
                                  lineHeight: "1.3rem",
                                  fontWeight: "700!important",
                                  textTransform: "uppercase",
                                  color: "#f8f9fa!important",
                                  mb: 0.8,
                                  textAlign: "left",
                                }}
                              >
                                {el.title}
                              </Typography>
                              <Typography
                                component="h1"
                                sx={{
                                  fontSize: "30px!important",
                                  lineHeight: "1.3rem",
                                  fontWeight: "initial",
                                  textTransform: "uppercase",
                                  color: "#f8f9fa!important",
                                  textAlign: "left",
                                }}
                              >
                                {el.count}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContent>
                    </CustomCard>
                  </Col>
                ) : (
                  <div key={id}></div>
                );
              })}
            </Row>
            <Card
              style={{ width: "100%", maxHeight: "500px", marginTop: "1rem" }}
            >
              {/* <Box>
                  <GoogleApiWrapper />
                </Box> */}
            </Card>
          </Container>

          {/* Chart */}

          <Card sx={{ boxShadow: "none", borderRadius: "20px" }}>
            <CardContent>
              <Box sx={{ mb: 4, textAlign: "left" }}>
                <Typography
                  component="h3"
                  sx={{
                    fontWeight: "600!important",
                    fontSize: "18px!important",
                    color: "#010101",
                  }}
                >
                  Sales Report
                </Typography>
              </Box>
              <div className="chart">
                {/* <Bar data={chartData} options={chartOptions} /> */}

                <ReactEcharts style={{ height: "100%" }} option={getOption()} />
              </div>
            </CardContent>
          </Card>
        </div>
      </>
      {/* )} */}
    </>
  );
};

class Dashboard extends Component {
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

export default Dashboard;
