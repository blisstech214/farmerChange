import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Sidenav.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../provider/snackbar";
import faceImg from "../../Assets/images/faces/face28.jpg";
import AdminLayout from "../../layout";

function AdminNavbar({ children }) {
  let snackbar = useSnackbar();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    type: "",
  });
  useEffect(() => {
    setUser((prevState) => ({
      ...prevState,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      type: localStorage.getItem("user_type"),
    }));
  }, []);

  const handlesignOut = () => {
    localStorage.clear();
    snackbar({
      message: "Sign out successfully.",
      severity: "success",
    });
    setTimeout(() => {
      navigate(`/`, { replace: true });
    }, 1000);
  };

  const fetchdata = async () => {
    // await apiAdminConfig
    //   .get(`notificationsmanagment/getall`)
    //   .then((response) => {
    //     let apidata = response.data.data;
    //     setPosts(apidata);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  useEffect(() => {
    fetchdata();
  }, [navigate]);

  return (
    <>
      <AdminLayout>{children}</AdminLayout>
    </>
  );
}

export default AdminNavbar;
