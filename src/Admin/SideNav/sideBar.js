import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  MdDashboard,
  MdOutlineSupervisedUserCircle,
  MdOutlineInfo,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import {
  FaUserFriends,
  FaRegStar,
  FaRegBell,
  FaRegImage,
  FaRegFilePdf,
  FaRegClone,
  FaRegAddressBook,
  FaUserAlt,
  FaUsersCog,
  FaJoget,
  FaScrewdriver,
  FaUserCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineCommentBank } from "react-icons/md";
import "./Sidenav.css";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  let sideNavData = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={25} />,
      link: "/master/dashboard",
      type: "dashboard",
      faIcon: "fas fa-th-large",
    },
    {
      title: "Drivers",
      icon: <FaUserCog size={25} />,
      link: "/master/driver",
      type: "driver",
      faIcon: "fas fa-user-cog",
      children: [
        {
          id: 1,
          title: "Drivers",
        },
      ],
    },
    {
      title: "Company",
      icon: <FaUsersCog size={25} />,
      link: "/master/user",
      type: "user",
      faIcon: "fas fa-building",
      children: [
        {
          id: 1,
          title: "Companies",
        },
      ],
    },
    {
      title: "Customers",
      icon: <FaUserAlt size={25} />,
      link: "/master/customer",
      type: "customer",
      faIcon: "fas fa-user",
      children: [
        {
          id: 1,
          title: "Customers",
        },
      ],
    },
    {
      title: "Jobs",
      icon: <FaJoget size={25} />,
      link: "/master/ride",
      type: "ride",
      faIcon: "fas fa-briefcase",
    },
    {
      title: "About Us",
      icon: <MdOutlineInfo size={25} />,
      link: "/master/about",
      type: "ride",
      faIcon: "fas fa-address-card",
    },
    {
      title: "Privacy Policy",
      icon: <MdOutlineCommentBank size={25} />,
      link: "/master/privacy",
      type: "privacy",
      faIcon: "fas fa-file-invoice",
    },
    {
      title: "FAQ",
      icon: <FaScrewdriver size={25} />,
      link: "/master/faq",
      type: "faq",
      faIcon: "fas fa-question-circle",
    },
    {
      title: "Contact Us",
      icon: <FaRegAddressBook size={25} />,
      link: "/master/contactlist",
      type: "contact",
      faIcon: "fas fa-address-book",
    },
    {
      title: "Terms & Conditions",
      icon: <FaRegFilePdf size={25} />,
      link: "/master/terms/add",
      type: "terms",
      faIcon: "fas fa-address-book",
    },
    {
      title: "Sub Admin",
      icon: <FaUserFriends size={25} />,
      link: "/master/subadmin",
      type: "subadmin",
      faIcon: "fas fa-user-check",
      children: [
        {
          id: 1,
          title: "Sub Admin",
        },
      ],
    },
    {
      title: "Blogs",
      icon: <FaRegClone size={25} />,
      link: "/master/blog",
      type: "blog",
      faIcon: "fas fa-th-list",
    },
    {
      title: "Supports",
      icon: <FaRegClone size={25} />,
      link: "/master/support",
      type: "support",
      faIcon: "fas fa-headset",
    },
    {
      title: "Testimonials",
      icon: <FaRegStar size={25} />,
      link: "/master/review-rating",
      type: "review",
      faIcon: "fas fa-star",
    },
    {
      title: "News Letter",
      icon: <FaRegImage size={25} />,
      link: "/master/newsletter",
      type: "newsletter",
      faIcon: "fas fa-envelope-open-text",
    },
    {
      title: "Notification Management",
      icon: <FaRegBell size={25} />,
      link: "/master/notificationmanagement",
      type: "notification",
      faIcon: "fas fa-bell",
    },
  ];
  console.log("pathname", pathname);
  let path = window.location.pathname.split("/", 3).join("/");

  return (
    <div style={{ position: "relative", background: "#F5F7FF" }}>
      {props.children}
    </div>
  );
};

export default Sidebar;
