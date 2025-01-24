import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import GoogleApiWrapper from "../../../Components/googlemap/GoogleApiWrapper";
import { Container } from "react-bootstrap";
import { Stack, Box, styled, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
  color: "#fff",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  textTransform: "capitalize",
}));

const getOption = () => ({
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
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
    axisLabel: { color: "#6C7383", fontWeight: "bold" },
    data: [
      "Jan", "Feb", "March", "April", "May", "June", 
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
  },
  yAxis: {
    type: "value",
    axisLabel: { color: "#6C7383", fontWeight: "bold" },
  },
  series: [
    {
      name: "Income",
      type: "bar",
      barWidth: "80%",
      itemStyle: { color: "#FF7534" },
      data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000],
    },
  ],
});

const DashboardContent = () => {
  const [dashboard, setDashboard] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchDashboardData = async () => {
    setLoader(true);
    try {
      const response = await apiAdminConfig.get(`api/auth/master/dashboard`);
      const viewData = response?.data?.view_data || {};
      const dataMap = [
        { key: "jobs", title: "Total Customer's", img: briefcase },
        { key: "drivers", title: "Total Farmer's", img: driver },
        { key: "admins", title: "Total Collection Center's", img: user },
        // { key: "companies", title: "Total Companies", img: subs },
        // { key: "amount", title: "Total Income", img: moneyspend },
        // { key: "customers", title: "Total Customers", img: hcustomer },
      ];

      const newData = dataMap.map((item) => ({
        title: item.title,
        img: item.img,
        count: viewData[item.key] || 0,
      }));

      setDashboard(newData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
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
              {dashboard.map((el, id) => (
                <Col lg={4} key={id} style={{ marginBottom: "20px" }}>
                  <CustomCard>
                    <CardContent>
                      <Stack direction="row" spacing={6}>
                        <Box>
                          <Image
                            src={el.img}
                            alt={el.title}
                            className="dashboardImage"
                          />
                        </Box>
                        <Box>
                          <Typography
                            component="h2"
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: "700",
                              color: "#f8f9fa",
                              textTransform: "uppercase",
                            }}
                          >
                            {el.title}
                          </Typography>
                          <Typography
                            component="h1"
                            sx={{
                              fontSize: "30px",
                              color: "#f8f9fa",
                            }}
                          >
                            {el.count}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </CustomCard>
                </Col>
              ))}
            </Row>

            {/* Chart Section */}
            <Card sx={{ boxShadow: "none", borderRadius: "20px", marginTop: "1rem" }}>
              <CardContent>
                <Typography
                  component="h3"
                  sx={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#010101",
                    marginBottom: "1rem",
                  }}
                >
                  Sales Report
                </Typography>
                <ReactEcharts style={{ height: "400px" }} option={getOption()} />
              </CardContent>
            </Card>
          </Container>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
