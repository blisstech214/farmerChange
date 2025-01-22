import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Logo from "../../Assets/images/admin/CS-LOGO-HORIZONTAL.png";
import "./adminsignin.css";
import { useFormik } from "formik";
import { TextBox } from "../../Components/form";
import { useAuthContext } from "../../auth/useAuthContext";
import GuestGuard from "../../auth/GuestGuard";


function Login() {
  const { login } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      email: "superadmin@mailinator.com",
      password: "Qwer!234",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (
        // eslint-disable-next-line no-useless-escape
        !/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/g.test(values.password)
      ) {
        errors.password = "Invalid Password address";
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      // console.log("formikvalues", values);
      try {
        login(values?.email, values.password);
      } catch (error) {}
    },
  });
  return (
    <Box sx={{ backgroundColor: "#f5f7ff", height: "100vh" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: "5%" }}
      >
        <CssBaseline />
        <Grid item xs={10} sm={8} md={4} component={Paper} elevation={0} square>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              padding: "2em 3em",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  marginBottom: "30px",
                }}
              >
                {/* <img
                  src={Logo}
                  className="d-inline-block  align-center"
                  alt="Doctorsplaza logo"
                  style={{
                    width: "180px",
                    height: "60px",
                    objectFit: "contain",
                  }}
                /> */}
              </Box>
              <Typography
                style={{
                  margin: "0px 10px",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
                component="h5"
                variant="h6"
                align="center"
              >
                Hello! let's get started
              </Typography>
              <Typography
                style={{
                  margin: "0px 10px",
                  fontWeight: 100,
                  fontSize: "16px",
                }}
                component="h5"
                variant="h6"
                align="center"
              >
                Log in to continue.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextBox
                  fullWidth
                  name="email"
                  placeholder="Username"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextBox
                  fullWidth
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                 
                  sx={{ mt: 3, mb: 2, py: 2, bordeRadius: "8px" }}
                >
                  Log In
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function AdminSignin() {
  return (
    <GuestGuard>
      
            <Login />
           
    </GuestGuard>
  );
}
